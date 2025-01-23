import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Not, Repository } from 'typeorm';
import { ConteudoTipoEntity } from '../entidades/conteudo-tipo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConteudoTipoAtualizarDto, ConteudoTipoCriarDto } from '../dtos/conteudo-tipo.dto';

@Injectable()
export class ConteudoTipoService {
    constructor(
        @InjectRepository(ConteudoTipoEntity)
        private readonly conteudoTipoRepository: Repository<ConteudoTipoEntity>
    ) {
    }

    tudo(): Promise<ConteudoTipoEntity[]> {
        return this.conteudoTipoRepository.find({ select: ["id", "nome"] });
    }

    async criar(conteudoTipoCriarDto: ConteudoTipoCriarDto): Promise<ConteudoTipoEntity> {
        return this.conteudoTipoRepository.manager.transaction(async (transaction) => {

            const conteudoTipoExiste = await transaction.find(ConteudoTipoEntity, {
                where: {
                    nome: ILike(`%${conteudoTipoCriarDto.nome}%`),
                },
                withDeleted: true
            });

            if (conteudoTipoExiste.length) {
                throw new BadRequestException(`A tipo de conteúdo '${conteudoTipoCriarDto.nome}' já existe.`);
            }

            const conteudoTipoCriado = transaction.create(ConteudoTipoEntity, {
                nome: conteudoTipoCriarDto.nome,
            });

            return await transaction.save(conteudoTipoCriado);
        });
    }

    async deletar(id: string) {
        return await this.conteudoTipoRepository.softDelete(id)
    }


    async atualizar(conteudoTipoAtualizarDto: ConteudoTipoAtualizarDto): Promise<ConteudoTipoEntity> {
        const conteudoTipo = await this.conteudoTipoRepository.findOneBy({ id: conteudoTipoAtualizarDto.id })

        if (!conteudoTipo) {
            throw new NotFoundException("Conteúdo tipo não encontrado")
        }

        await this.verificarConteudoTipoNomeEmUso(conteudoTipoAtualizarDto.nome, conteudoTipoAtualizarDto.id)
        return this.conteudoTipoRepository.manager.transaction(async transaction => {
            return transaction.save(ConteudoTipoEntity, {  ...conteudoTipo, ...conteudoTipoAtualizarDto })
        })
    }


    /**
     *
     * Recebe o nome da conteudoTipo e o conteudoTipoID
     * Verifica se o nome já esta em uso
     * O conteudoTipoID é para verificar se, caso o nome exista, ignorar caso seja igual ao ID do conteudo tipo que foi passada como parametro
     *
     * @param nome
     * @param conteudoTipoId
     * @private
     */
    private async verificarConteudoTipoNomeEmUso(nome: string, conteudoTipoId?: string): Promise<void> {
        const nomeEmUso = await this.conteudoTipoRepository.find({
            where: {
                nome: ILike(`%${nome}%`),
                id:  conteudoTipoId ? Not(conteudoTipoId): undefined
            },
            withDeleted: true
        })

        if (nomeEmUso.length) {
            throw new BadRequestException(`O conteúdo tipo '${nome}' já existe.`);
        }
    }
}
