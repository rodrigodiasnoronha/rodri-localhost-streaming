import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaEntity } from './categoria.entity';
import { CategoriaCriarDto } from './dtos/categoria.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('categoria')
export class CategoriaController {

    constructor(
        private readonly categoriaService: CategoriaService,
    ) {
    }

    @Get()
    tudo(): Promise<CategoriaEntity[]> {
        return this.categoriaService.tudo();
    }


    @Post()
    @ApiBody({ type: CategoriaCriarDto })
    @HttpCode(HttpStatus.CREATED)
    async criar(@Body() categoriaCriarDto: CategoriaCriarDto): Promise<CategoriaEntity> {
        return await this.categoriaService.criar(categoriaCriarDto)
    }
}
