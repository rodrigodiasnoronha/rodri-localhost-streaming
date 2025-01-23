import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Query, Post } from '@nestjs/common';
import { ClassificacaoIndicativaEntity } from '../entidades/classificacao-indicativa.entity';
import { ClassificacaoIndicativaCriarDto } from '../dtos/classificacao-indicativa.dto';
import { ClassificacaoIndicativaService } from '../servicos/classificacao-indicativa.service';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('classificacao-indicativa')
export class ClassificacaoIndicativaController {

    constructor(
        private readonly classificacaoIndicativaService: ClassificacaoIndicativaService
    ) {
    }

    @Get()
    todos(): Promise<ClassificacaoIndicativaEntity[]> {
        return this.classificacaoIndicativaService.tudo()
    }

    @Post()
    @ApiBody({ type: ClassificacaoIndicativaCriarDto })
    @HttpCode(HttpStatus.CREATED)
    async criar(@Body() classificacaoIndicativaCriarDto: ClassificacaoIndicativaCriarDto): Promise<ClassificacaoIndicativaEntity> {
        return await this.classificacaoIndicativaService.criar(classificacaoIndicativaCriarDto)
    }

    @Delete()
    @ApiQuery({ name: 'id', type: String, required: true })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletar(@Query() id: string) {
        await this.classificacaoIndicativaService.deletar(id)
    }
}
