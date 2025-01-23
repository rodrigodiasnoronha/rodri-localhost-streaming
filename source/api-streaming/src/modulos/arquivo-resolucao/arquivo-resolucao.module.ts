import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoEntity } from '../arquivo/entidades/arquivo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArquivoEntity])],
    exports: [TypeOrmModule],
})
export class ArquivoResolucaoModule {}
