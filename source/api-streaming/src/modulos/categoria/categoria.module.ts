import { Module } from '@nestjs/common';
import { CategoriaService } from './servicos/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './entidades/categoria.entity';

@Module({
    providers: [CategoriaService],
    controllers: [CategoriaController],
    imports: [TypeOrmModule.forFeature([CategoriaEntity])],
    exports: [TypeOrmModule],

})
export class CategoriaModule {
}
