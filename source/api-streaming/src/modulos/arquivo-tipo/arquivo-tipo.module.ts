import { Module } from '@nestjs/common';
import { ArquivoTipoController } from './controllers/arquivo-tipo.controller';
import { ArquivoTipoService } from './servicos/arquivo-tipo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoTipoEntity } from './entidades/arquivo-tipo.entity';
import { ArquivoEntity } from '../arquivo/entidades/arquivo.entity';
import { JwtService } from '@nestjs/jwt';
import { ConteudoEntity } from '../conteudo/entidades/conteudo.entity';
import { ConteudoTipoEntity } from '../conteudo-tipo/entidades/conteudo-tipo.entity';
import { ClassificacaoIndicativaEntity } from '../classificacao-indicativa/entidades/classificacao-indicativa.entity';
import { EstudioEntity } from '../estudio/entidades/estudio.entity';

@Module({
  controllers: [ArquivoTipoController],
  providers: [ArquivoTipoService, JwtService],
  imports: [TypeOrmModule.forFeature([
    ArquivoTipoEntity,
    ArquivoEntity,
    ConteudoEntity,
    ConteudoTipoEntity,
    ClassificacaoIndicativaEntity,
    EstudioEntity,
  ])],
  exports: [TypeOrmModule],
})
export class ArquivoTipoModule {
}
