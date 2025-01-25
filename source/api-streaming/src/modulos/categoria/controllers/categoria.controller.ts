import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CategoriaService } from '../servicos/categoria.service';
import { CategoriaEntity } from '../entidades/categoria.entity';
import { CategoriaAtualizarDto, CategoriaCriarDto } from '../dtos/categoria.dto';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';

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
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async criar(@Body() categoriaCriarDto: CategoriaCriarDto): Promise<CategoriaEntity> {
        return await this.categoriaService.criar(categoriaCriarDto)
    }

    @Delete()
    @ApiQuery({ name: 'id', type: String, required: true })
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deletar(@Query() id: string): Promise<void> {
        await this.categoriaService.deletar(id)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: CategoriaAtualizarDto })
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async atualizar(@Body() categoriaAtualizarDto: CategoriaAtualizarDto): Promise<CategoriaEntity> {
        return await this.categoriaService.atualizar(categoriaAtualizarDto)
    }
}
