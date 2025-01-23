import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from '../entidades/categoria.entity';
import { ILike, Not, Repository } from 'typeorm';
import { CategoriaAtualizarDto, CategoriaCriarDto } from '../dtos/categoria.dto';

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(CategoriaEntity)
        private categoriaRepository: Repository<CategoriaEntity>,
    ) {
    }

    tudo(): Promise<CategoriaEntity[]> {
        return this.categoriaRepository.find({ select: ["id", "nome"] });
    }

    async criar(categoriaCriarDto: CategoriaCriarDto): Promise<CategoriaEntity> {
        await this.verificarNomeCategoriaEmUso(categoriaCriarDto.nome)

        return this.categoriaRepository.manager.transaction(async (transaction) => {
            const categoriaCriada = transaction.create(CategoriaEntity, {
                nome: categoriaCriarDto.nome,
            });

            return await transaction.save(categoriaCriada);
        });
    }

    async deletar(id: string) {
        return await this.categoriaRepository.softDelete(id)
    }

    async atualizar(categoriaAtualizarDto: CategoriaAtualizarDto): Promise<CategoriaEntity> {
        const categoria = await this.categoriaRepository.findOneBy({ id: categoriaAtualizarDto.id })

        if (!categoria) {
            throw new NotFoundException("Categoria não encontrada")
        }

        await this.verificarNomeCategoriaEmUso(categoriaAtualizarDto.nome, categoriaAtualizarDto.id)
        return this.categoriaRepository.manager.transaction(async transaction => {

            return transaction.save(CategoriaEntity, {  ...categoria, ...categoriaAtualizarDto })
        })
    }


    /**
     *
     * Recebe o nome da categoria e o categoria ID
     * Verifica se o nome já esta em uso
     * O categoriaID é para verificar se, caso o nome exista, ignorar caso seja igual ao ID da categoria que foi passada como parametro
     *
     * @param nome
     * @param categoriaId
     * @private
     */
    private async verificarNomeCategoriaEmUso(nome: string, categoriaId?: string): Promise<void> {
        const nomeEmUso = await this.categoriaRepository.find({
            where: {
                nome: ILike(`%${nome}%`),
                id:  categoriaId ? Not(categoriaId): undefined
            },
            withDeleted: true
        })

        if (nomeEmUso.length) {
            throw new BadRequestException(`A categoria '${nome}' já existe.`);
        }
    }
}
