import { Module } from '@nestjs/common';
import { ConteudoTipoService } from './servicos/conteudo-tipo.service';
import { ConteudoTipoController } from './controllers/conteudo-tipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConteudoTipoEntity } from './entidades/conteudo-tipo.entity';

@Module({
  providers: [ConteudoTipoService],
  controllers: [ConteudoTipoController],
  imports: [TypeOrmModule.forFeature([ConteudoTipoEntity])],
  exports: [TypeOrmModule],
})
export class ConteudoTipoModule {}
