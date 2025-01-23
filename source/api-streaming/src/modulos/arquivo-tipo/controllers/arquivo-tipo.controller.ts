import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query } from '@nestjs/common';
import { ArquivoTipoService } from '../servicos/arquivo-tipo.service';
import { ArquivoTipoAtualizarDto, ArquivoTipoCriarDto } from '../dtos/arquivo-tipo.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { ArquivoTipoEntity } from '../entidades/arquivo-tipo.entity';

@Controller('arquivo-tipo')
export class ArquivoTipoController {

    constructor(
        private readonly arquivoTipoService: ArquivoTipoService
    ) {
    }

    @Get()
    async tudo(): Promise<ArquivoTipoEntity[]> {
        return await this.arquivoTipoService.tudo()
    }

    @Post()
    @ApiBody({ type: ArquivoTipoCriarDto })
    @HttpCode(HttpStatus.CREATED)
    async criar(@Body() arquivoTipoCriarDto: ArquivoTipoCriarDto): Promise<ArquivoTipoEntity> {
        return await this.arquivoTipoService.criar(arquivoTipoCriarDto)
    }


    @Delete()
    @ApiQuery({ name: 'id', type: String, required: true })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletar(@Query() id: string) {
        await this.arquivoTipoService.deletar(id)
    }


    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: ArquivoTipoAtualizarDto })
    async atualizar(@Body() arquivoTipoAtualizarDto: ArquivoTipoAtualizarDto): Promise<ArquivoTipoEntity> {
        return await this.arquivoTipoService.atualizar(arquivoTipoAtualizarDto)
    }
}
