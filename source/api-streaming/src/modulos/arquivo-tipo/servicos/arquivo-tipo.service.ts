import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Not, Repository } from 'typeorm';
import { ArquivoTipoAtualizarDto, ArquivoTipoCriarDto } from '../dtos/arquivo-tipo.dto';
import { ArquivoTipoEntity } from '../entidades/arquivo-tipo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArquivoTipoService {

    constructor(
        @InjectRepository(ArquivoTipoEntity)
        private readonly arquivoTipoRepository: Repository<ArquivoTipoEntity>
    ) {
    }

    async tudo(): Promise<ArquivoTipoEntity[]> {
        return this.arquivoTipoRepository.find({ select: ["id", "nome"] })
    }

    async criar(arquivoTipoCriarDto: ArquivoTipoCriarDto): Promise<ArquivoTipoEntity> {
        return this.arquivoTipoRepository.manager.transaction(async (transaction) => {

            const arquivoTipoExiste = await transaction.find(ArquivoTipoEntity, {
                where: {
                    nome: ILike(`%${arquivoTipoCriarDto.nome}%`),
                },
                withDeleted: true
            });

            if (arquivoTipoExiste.length) {
                throw new BadRequestException(`O tipo de arquivo '${arquivoTipoCriarDto.nome}' já existe.`);
            }

            const arquivoTipoCriado = transaction.create(ArquivoTipoEntity, {
                nome: arquivoTipoCriarDto.nome,
            });

            return await transaction.save(arquivoTipoCriado);
        });
    }

    async deletar(id: string) {
        return await this.arquivoTipoRepository.softDelete(id)
    }


    async atualizar(arquivoTipoAtualizarDto: ArquivoTipoAtualizarDto): Promise<ArquivoTipoEntity> {
        const arquivoTipo = await this.arquivoTipoRepository.findOneBy({ id: arquivoTipoAtualizarDto.id })

        if (!arquivoTipo) {
            throw new NotFoundException("Tipo de arquivo não encontrada")
        }

        await this.verificarNomeArquivoTipo(arquivoTipoAtualizarDto.nome, arquivoTipoAtualizarDto.id)
        return this.arquivoTipoRepository.manager.transaction(async transaction => {

            return transaction.save(ArquivoTipoEntity, {  ...arquivoTipo, ...arquivoTipoAtualizarDto })
        })
    }


    /**
     *
     * Recebe o nome do arquivo tipo e o arquivo tipo ID
     * Verifica se o nome já esta em uso
     * O arquivo tipo ID é para verificar se, caso o nome exista, ignorar caso seja igual ao ID do arquivo tipo que foi passada como parametro
     *
     * @param nome
     * @param arquivoTipoId
     * @private
     */
    private async verificarNomeArquivoTipo(nome: string, arquivoTipoId?: string): Promise<void> {
        const nomeEmUso = await this.arquivoTipoRepository.find({
            where: {
                nome: ILike(`%${nome}%`),
                id:  arquivoTipoId ? Not(arquivoTipoId): undefined
            },
            withDeleted: true
        })

        if (nomeEmUso.length) {
            throw new BadRequestException(`A arquivo tipo '${nome}' já existe.`);
        }
    }
}
