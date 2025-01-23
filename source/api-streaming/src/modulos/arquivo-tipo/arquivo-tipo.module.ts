import { Module } from '@nestjs/common';
import { ArquivoTipoController } from './controllers/arquivo-tipo.controller';
import { ArquivoTipoService } from './servicos/arquivo-tipo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoTipoEntity } from './entidades/arquivo-tipo.entity';
import { ArquivoEntity } from '../arquivo/entidades/arquivo.entity';

@Module({
  controllers: [ArquivoTipoController],
  providers: [ArquivoTipoService],
  imports: [TypeOrmModule.forFeature([ArquivoTipoEntity, ArquivoEntity])],
  exports: [TypeOrmModule],
})
export class ArquivoTipoModule {}
