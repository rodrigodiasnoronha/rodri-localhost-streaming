import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassificacaoIndicativaEntity } from '../entidades/classificacao-indicativa.entity';
import { ILike, Repository } from 'typeorm';
import { ClassificacaoIndicativaCriarDto } from '../dtos/classificacao-indicativa.dto';

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
}
