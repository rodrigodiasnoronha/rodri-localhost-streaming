import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ClassificacaoIndicativaEntity } from './classificacao-indicativa.entity';
import { ClassificacaoIndicativaCriarDto } from './dtos/classificacao-indicativa.dto';
import { ClassificacaoIndicativaService } from './classificacao-indicativa.service';
import { ApiBody } from '@nestjs/swagger';

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
}
