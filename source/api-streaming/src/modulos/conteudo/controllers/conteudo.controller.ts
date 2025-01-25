import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { PaginacaoDto } from '../../compartilhado/dtos/paginacao';
import { ConteudoEntity } from '../entidades/conteudo.entity';
import { ConteudoService } from '../servicos/conteudo.service';
import { ConteudoCriarDto, ConteudoPaginadoQueryParamsDto } from '../dtos/conteudo.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';

@Controller('conteudo')
export class ConteudoController {

    constructor(
        private readonly conteudoService: ConteudoService,
    ) {
    }

    @Get('/paginado')
    @HttpCode(HttpStatus.OK)
    paginado(@Query() conteudoPaginadoParamsDto: ConteudoPaginadoQueryParamsDto): Promise<PaginacaoDto<ConteudoEntity>> {
        return this.conteudoService.paginado(conteudoPaginadoParamsDto);
    }

    @Post()
    @ApiBody({ type: ConteudoCriarDto })
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async criar(@Body() conteudoCriarDto: ConteudoCriarDto) {
        return conteudoCriarDto; // TODO: fazer ainda depois do upload de arquivo
    }
}
