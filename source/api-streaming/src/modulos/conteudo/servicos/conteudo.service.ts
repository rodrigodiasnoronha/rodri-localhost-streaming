import { Injectable } from '@nestjs/common';
import { PaginacaoDto } from '../../compartilhado/dtos/paginacao';
import { ConteudoEntity } from '../entidades/conteudo.entity';
import { ConteudoPaginadoQueryParamsDto } from '../dtos/conteudo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConteudoService {

    constructor(
        @InjectRepository(ConteudoEntity)
        private readonly conteudoRepository: Repository<ConteudoEntity>,
    ) {
    }

    async paginado(conteudoPaginadoParamsDto: ConteudoPaginadoQueryParamsDto): Promise<PaginacaoDto<ConteudoEntity>> {
        const [data, total] = await this.conteudoRepository.findAndCount({
            take: conteudoPaginadoParamsDto.limite,
            skip: conteudoPaginadoParamsDto.pagina,
        });

        return {
            data,
            total
        } as PaginacaoDto<ConteudoEntity>

    }
}
