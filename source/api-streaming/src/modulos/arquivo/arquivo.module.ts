import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoTipoEntity } from '../arquivo-tipo/entidades/arquivo-tipo.entity';
import { ArquivoEntity } from './entidades/arquivo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArquivoEntity, ArquivoTipoEntity])],
    exports: [TypeOrmModule],
})
export class ArquivoModule {}
