import { Module } from '@nestjs/common';
import { ConteudoService } from './servicos/conteudo.service';
import { ConteudoController } from './controllers/conteudo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConteudoEntity } from './entidades/conteudo.entity';

@Module({
    providers: [ConteudoService],
    controllers: [ConteudoController],
    imports: [TypeOrmModule.forFeature([ConteudoEntity])],
    exports: [TypeOrmModule],
})
export class ConteudoModule {
}
