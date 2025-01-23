import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './categoria.entity';

@Module({
    providers: [CategoriaService],
    controllers: [CategoriaController],
    imports: [TypeOrmModule.forFeature([CategoriaEntity])],
    exports: [TypeOrmModule],

})
export class CategoriaModule {
}
