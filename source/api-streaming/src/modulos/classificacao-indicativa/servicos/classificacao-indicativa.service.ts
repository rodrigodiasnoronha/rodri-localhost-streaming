import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassificacaoIndicativaEntity } from '../entidades/classificacao-indicativa.entity';
import { ILike, Not, Repository } from 'typeorm';
import {
    ClassificacaoIndicativaAtualizarDto,
    ClassificacaoIndicativaCriarDto,
} from '../dtos/classificacao-indicativa.dto';

@Injectable()
export class ClassificacaoIndicativaService {

    constructor(
        @InjectRepository(ClassificacaoIndicativaEntity)
        private readonly  classificacaoIndicativaRepository: Repository<ClassificacaoIndicativaEntity>
    ) {
    }

    tudo(): Promise<ClassificacaoIndicativaEntity[]> {
        return this.classificacaoIndicativaRepository.find({ select: ["id", "nome", "descricao"]})
    }

    async criar(classificacaoIndicativaCriarDto: ClassificacaoIndicativaCriarDto): Promise<ClassificacaoIndicativaEntity> {
        return this.classificacaoIndicativaRepository.manager.transaction(async (transaction) => {

            const classificacaoIndicativaExiste = await transaction.find(ClassificacaoIndicativaEntity, {
                where: {
                    nome: ILike(`%${classificacaoIndicativaCriarDto.nome}%`),
                },
                withDeleted: true
            });

            if (classificacaoIndicativaExiste.length) {
                throw new BadRequestException(`A classificação indicativa '${classificacaoIndicativaCriarDto.nome}' já existe.`);
            }

            const classificacaoIndicacativaCriada = transaction.create(ClassificacaoIndicativaEntity, {
                nome: classificacaoIndicativaCriarDto.nome,
                descricao: classificacaoIndicativaCriarDto.descricao
            });

            return await transaction.save(classificacaoIndicacativaCriada);
        });
    }

    async deletar(id: string) {
        return await this.classificacaoIndicativaRepository.softDelete(id)
    }

    async atualizar(classificacaoIndicativaAtualizarDto: ClassificacaoIndicativaAtualizarDto): Promise<ClassificacaoIndicativaEntity> {
        const classificacaoIndicativa = await this.classificacaoIndicativaRepository.findOneBy({ id: classificacaoIndicativaAtualizarDto.id })

        if (!classificacaoIndicativa) {
            throw new NotFoundException("Classificação Indicativa não encontrada")
        }

        await this.verificarNomeClassicacaoIndicativa(classificacaoIndicativaAtualizarDto.nome, classificacaoIndicativaAtualizarDto.id)
        return this.classificacaoIndicativaRepository.manager.transaction(async transaction => {
            return transaction.save(ClassificacaoIndicativaEntity, {
                ...classificacaoIndicativa,
                ...classificacaoIndicativaAtualizarDto
            })
        })
    }


    /**
     *
     * Recebe o nome da classificação indicativa
     * Verifica se o nome já esta em uso
     * O classificacaoIndicativaId é para verificar se, caso o nome exista, ignorar caso seja igual ao ID da classificacaoIndicativaId que foi passada como parametro
     *
     * @param nome
     * @param classificacaoIndicativaId
     * @private
     */
    private async verificarNomeClassicacaoIndicativa(nome: string, classificacaoIndicativaId?: string): Promise<void> {
        const nomeEmUso = await this.classificacaoIndicativaRepository.find({
            where: {
                nome: ILike(`%${nome}%`),
                id:  classificacaoIndicativaId ? Not(classificacaoIndicativaId): undefined
            },
            withDeleted: true
        })

        if (nomeEmUso.length) {
            throw new BadRequestException(`A Classificação Indicativa '${nome}' já existe.`);
        }
    }
}
