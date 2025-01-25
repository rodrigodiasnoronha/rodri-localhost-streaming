import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ArquivoTipoService } from '../servicos/arquivo-tipo.service';
import { ArquivoTipoAtualizarDto, ArquivoTipoCriarDto } from '../dtos/arquivo-tipo.dto';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ArquivoTipoEntity } from '../entidades/arquivo-tipo.entity';
import { AuthGuard } from '../../auth/guard/auth.guard';

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
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async criar(@Body() arquivoTipoCriarDto: ArquivoTipoCriarDto): Promise<ArquivoTipoEntity> {
        return await this.arquivoTipoService.criar(arquivoTipoCriarDto)
    }


    @Delete()
    @ApiQuery({ name: 'id', type: String, required: true })
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deletar(@Query() id: string) {
        await this.arquivoTipoService.deletar(id)
    }


    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: ArquivoTipoAtualizarDto })
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async atualizar(@Body() arquivoTipoAtualizarDto: ArquivoTipoAtualizarDto): Promise<ArquivoTipoEntity> {
        return await this.arquivoTipoService.atualizar(arquivoTipoAtualizarDto)
    }
}
