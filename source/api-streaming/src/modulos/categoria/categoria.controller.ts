import { Controller, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaEntity } from './categoria.entity';

@Controller('categoria')
export class CategoriaController {

    constructor(
        private readonly categoriaService: CategoriaService,
    ) {
    }

    @Get()
    findAll(): Promise<CategoriaEntity[]> {
        return this.categoriaService.findAll();
    }
}
