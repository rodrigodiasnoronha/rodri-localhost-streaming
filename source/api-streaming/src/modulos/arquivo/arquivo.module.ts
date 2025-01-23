import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoTipoEntity } from '../arquivo-tipo/entidades/arquivo-tipo.entity';
import { ArquivoEntity } from './entidades/arquivo.entity';
import { ArquivoResolucaoEntity } from '../arquivo-resolucao/entidades/arquivo-resolucao.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArquivoEntity, ArquivoTipoEntity, ArquivoResolucaoEntity])],
    exports: [TypeOrmModule],
})
export class ArquivoModule {}
