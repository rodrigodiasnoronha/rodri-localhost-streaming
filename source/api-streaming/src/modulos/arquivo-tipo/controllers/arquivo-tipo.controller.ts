import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ArquivoTipoService } from '../servicos/arquivo-tipo.service';
import { ArquivoTipoCriarDto } from '../dtos/arquivo-tipo.dto';
import { ApiBody } from '@nestjs/swagger';
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
}
