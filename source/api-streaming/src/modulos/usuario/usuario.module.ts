import { Module } from '@nestjs/common';
import { UsuarioService } from './servicos/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entidades/usuario.entity';

@Module({
    providers: [UsuarioService],
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    exports: [TypeOrmModule],
})
export class UsuarioModule {
}
