import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query } from '@nestjs/common';
import { CategoriaService } from '../servicos/categoria.service';
import { CategoriaEntity } from '../entidades/categoria.entity';
import { CategoriaAtualizarDto, CategoriaCriarDto } from '../dtos/categoria.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

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

    @Delete()
    @ApiQuery({ name: 'id', type: String, required: true })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletar(@Query() id: string): Promise<void> {
        await this.categoriaService.deletar(id)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: CategoriaAtualizarDto })
    async atualizar(@Body() categoriaAtualizarDto: CategoriaAtualizarDto): Promise<CategoriaEntity> {
        return await this.categoriaService.atualizar(categoriaAtualizarDto)
    }
}
