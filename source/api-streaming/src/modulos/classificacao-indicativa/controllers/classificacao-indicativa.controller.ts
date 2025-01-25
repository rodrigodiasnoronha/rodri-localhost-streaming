import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Query, Post, Put, UseGuards } from '@nestjs/common';
import { ClassificacaoIndicativaEntity } from '../entidades/classificacao-indicativa.entity';
import {
    ClassificacaoIndicativaAtualizarDto,
    ClassificacaoIndicativaCriarDto,
} from '../dtos/classificacao-indicativa.dto';
import { ClassificacaoIndicativaService } from '../servicos/classificacao-indicativa.service';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';

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
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async criar(@Body() classificacaoIndicativaCriarDto: ClassificacaoIndicativaCriarDto): Promise<ClassificacaoIndicativaEntity> {
        return await this.classificacaoIndicativaService.criar(classificacaoIndicativaCriarDto)
    }

    @Delete()
    @ApiQuery({ name: 'id', type: String, required: true })
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deletar(@Query() id: string) {
        await this.classificacaoIndicativaService.deletar(id)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: ClassificacaoIndicativaAtualizarDto })
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async atualizar(@Body() classificacaoIndicativaAtualizarDto: ClassificacaoIndicativaAtualizarDto): Promise<ClassificacaoIndicativaEntity> {
        return await this.classificacaoIndicativaService.atualizar(classificacaoIndicativaAtualizarDto)
    }
}
