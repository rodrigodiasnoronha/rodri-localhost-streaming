import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EstudioEntity } from '../entidades/estudio.entity';
import { ILike, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudioAtualizarDto, EstudioCriarDto } from '../dtos/estudio.dto';

@Injectable()
export class EstudioService {

    constructor(
        @InjectRepository(EstudioEntity)
        private readonly estudioRepository: Repository<EstudioEntity>
    ) {
    }

    async tudo(): Promise<EstudioEntity[]> {
        return this.estudioRepository.find({ select: ["id", "nome"] })
    }

    async criar(estudioCriarDto: EstudioCriarDto): Promise<EstudioEntity> {
        await this.verificarNomeEstudioEmUso(estudioCriarDto.nome)

        return this.estudioRepository.manager.transaction(async (transaction) => {
            const estudioCriado = transaction.create(EstudioEntity, {
                nome: estudioCriarDto.nome,
            });

            return await transaction.save(estudioCriado);
        });
    }

    async atualizar(estudioAtualizarDto: EstudioAtualizarDto): Promise<EstudioEntity> {
        const estudio = await this.estudioRepository.findOneBy({ id: estudioAtualizarDto.id })

        if (!estudio) {
            throw new NotFoundException("Estúdio não encontrado")
        }

        await this.verificarNomeEstudioEmUso(estudioAtualizarDto.nome, estudioAtualizarDto.id)
        return this.estudioRepository.manager.transaction(async transaction => {

            return transaction.save(EstudioEntity, {  ...estudio, ...estudioAtualizarDto })
        })
    }


    async deletar(id: string) {
        return await this.estudioRepository.softDelete(id)
    }


    /**
     *
     * Verifica se o nome do estúdio já está em uso
     *
     * @param nome
     * @param estudioId
     * @private
     */
    private async verificarNomeEstudioEmUso(nome: string, estudioId?: string): Promise<void> {
        const nomeEmUso = await this.estudioRepository.find({
            where: {
                nome: ILike(`%${nome}%`),
                id:  estudioId ? Not(estudioId): undefined
            },
            withDeleted: true
        })

        if (nomeEmUso.length) {
            throw new BadRequestException(`O Estúdio '${nome}' já existe.`);
        }
    }
}
