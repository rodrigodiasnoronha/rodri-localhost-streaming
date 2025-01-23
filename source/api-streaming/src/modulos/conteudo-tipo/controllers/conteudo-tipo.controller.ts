import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { ConteudoTipoCriarDto } from '../dtos/conteudo-tipo.dto';
import { ConteudoTipoEntity } from '../entidades/conteudo-tipo.entity';
import { ConteudoTipoService } from '../servicos/conteudo-tipo.service';

@Controller('conteudo-tipo')
export class ConteudoTipoController {

    constructor(
        private readonly conteudoTipoService: ConteudoTipoService
    ) {
    }

    @Get()
    tudo(): Promise<ConteudoTipoEntity[]> {
        return this.conteudoTipoService.tudo();
    }

    @Post()
    @ApiBody({ type: ConteudoTipoCriarDto })
    @HttpCode(HttpStatus.CREATED)
    async criar(@Body() conteudoTipoCriarDto: ConteudoTipoCriarDto): Promise<ConteudoTipoEntity> {
        return await this.conteudoTipoService.criar(conteudoTipoCriarDto)
    }

    @Delete()
    @ApiQuery({ name: 'id', type: String, required: true })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletar(@Query() id: string) {
        await this.conteudoTipoService.deletar(id)
    }
}
