import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificacaoIndicativaEntity } from './entidades/classificacao-indicativa.entity';
import { ClassificacaoIndicativaController } from './controllers/classificacao-indicativa.controller';
import { ClassificacaoIndicativaService } from './servicos/classificacao-indicativa.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([ClassificacaoIndicativaEntity])],
    exports: [TypeOrmModule],
    controllers: [ClassificacaoIndicativaController],
    providers: [ClassificacaoIndicativaService, JwtService],
})
export class ClassificacaoIndicativaModule {
}
