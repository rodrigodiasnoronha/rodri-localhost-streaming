import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from './categoria.entity';
import { ILike, Repository } from 'typeorm';
import { CategoriaCriarDto } from './dtos/categoria.dto';

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
        return this.categoriaRepository.manager.transaction(async (transaction) => {

            const categoriaExiste = await transaction.find(CategoriaEntity, {
                where: {
                    nome: ILike(`%${categoriaCriarDto.nome}%`),
                },
            });

            if (categoriaExiste.length) {
                throw new BadRequestException(`A categoria '${categoriaCriarDto.nome}' já existe.`);
            }

            const categoriaCriada = transaction.create(CategoriaEntity, {
                nome: categoriaCriarDto.nome,
            });

            return await transaction.save(categoriaCriada);
        });
    }
}
