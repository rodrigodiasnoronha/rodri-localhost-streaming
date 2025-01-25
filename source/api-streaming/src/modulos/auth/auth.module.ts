import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './servicos/auth.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioService } from '../usuario/servicos/usuario.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/entidades/usuario.entity';

@Module({
    controllers: [AuthController],
    providers: [AuthService, UsuarioService],
    imports: [
        UsuarioModule,
        JwtModule.register({
            global: true,
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
        TypeOrmModule.forFeature([UsuarioEntity]),
    ],
    exports: [TypeOrmModule],
})
export class AuthModule {
}
