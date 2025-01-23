import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from './categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(CategoriaEntity)
        private categoriaRepository: Repository<CategoriaEntity>
    ) {
    }

    findAll(): Promise<CategoriaEntity[]> {

        return this.categoriaRepository.find()
    }
}
