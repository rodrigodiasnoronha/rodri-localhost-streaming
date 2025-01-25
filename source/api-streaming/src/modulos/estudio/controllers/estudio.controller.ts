import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EstudioEntity } from '../entidades/estudio.entity';
import { EstudioService } from '../servicos/estudio.service';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { EstudioAtualizarDto, EstudioCriarDto } from '../dtos/estudio.dto';

@Controller('estudio')
export class EstudioController {

    constructor(
        private readonly estudioService: EstudioService
    ) {
    }

    @Get()
    tudo(): Promise<EstudioEntity[]> {
        return this.estudioService.tudo();
    }

    @Post()
    @ApiBody({ type: EstudioCriarDto })
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async criar(@Body() estudioCriarDto: EstudioCriarDto): Promise<EstudioEntity> {
        return await this.estudioService.criar(estudioCriarDto)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: EstudioAtualizarDto })
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async atualizar(@Body() estudioAtualizarDto: EstudioAtualizarDto): Promise<EstudioEntity> {
        return await this.estudioService.atualizar(estudioAtualizarDto)
    }

    @Delete()
    @ApiQuery({ name: 'id', type: String, required: true })
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deletar(@Query() id: string): Promise<void> {
        await this.estudioService.deletar(id)
    }
}
