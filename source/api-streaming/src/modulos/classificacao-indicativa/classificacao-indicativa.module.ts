import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificacaoIndicativaEntity } from './classificacao-indicativa.entity';
import { ClassificacaoIndicativaController } from './classificacao-indicativa.controller';
import { ClassificacaoIndicativaService } from './classificacao-indicativa.service';

@Module({
    imports: [TypeOrmModule.forFeature([ClassificacaoIndicativaEntity])],
    exports: [TypeOrmModule],
    controllers: [ClassificacaoIndicativaController],
    providers: [ClassificacaoIndicativaService],
})
export class ClassificacaoIndicativaModule {
}
