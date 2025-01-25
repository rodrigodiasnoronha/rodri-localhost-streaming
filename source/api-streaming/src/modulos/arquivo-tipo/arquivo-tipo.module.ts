import { Module } from '@nestjs/common';
import { ArquivoTipoController } from './controllers/arquivo-tipo.controller';
import { ArquivoTipoService } from './servicos/arquivo-tipo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoTipoEntity } from './entidades/arquivo-tipo.entity';
import { ArquivoEntity } from '../arquivo/entidades/arquivo.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ArquivoTipoController],
  providers: [ArquivoTipoService, JwtService],
  imports: [TypeOrmModule.forFeature([ArquivoTipoEntity, ArquivoEntity])],
  exports: [TypeOrmModule],
})
export class ArquivoTipoModule {}
