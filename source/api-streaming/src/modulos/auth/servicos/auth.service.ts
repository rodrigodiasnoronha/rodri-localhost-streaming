import { Injectable } from '@nestjs/common';
import { UsuarioCriarDto } from '../../usuario/dtos/usuario.dto';
import { UsuarioService } from '../../usuario/servicos/usuario.service';
import { AuthTokenDto } from '../dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsuarioEntity } from '../../usuario/entidades/usuario.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) {
    }

    async cadastroUsuario(usuarioCriarDto: UsuarioCriarDto): Promise<AuthTokenDto> {
        await this.usuarioService.verificarUsuarioEEmailEmUso(usuarioCriarDto.usuario, usuarioCriarDto.email);
        const usuario = await this.usuarioService.criar(usuarioCriarDto);
        const access_token = await this.jwtService.signAsync({ id: usuario.id })
        return { access_token } as AuthTokenDto
    }

    async buscarCadastro(id: string): Promise<UsuarioEntity> {
        return this.usuarioService.buscarUsuarioPorId(id)
    }
}
