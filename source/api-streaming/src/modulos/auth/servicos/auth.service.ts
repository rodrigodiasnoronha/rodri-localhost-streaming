import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuarioCriarDto } from '../../usuario/dtos/usuario.dto';
import { UsuarioService } from '../../usuario/servicos/usuario.service';
import { AuthLoginDto, AuthTokenDto } from '../dtos/auth.dto';
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
        return this.gerarTokenAutenticacao(usuario)
    }

    async buscarCadastro(id: string): Promise<UsuarioEntity> {
        return this.usuarioService.buscarUsuarioPorId(id)
    }

    async loginUsuario(authLoginDto: AuthLoginDto): Promise<AuthTokenDto> {
        const usuario = await this.usuarioService.buscarUsuarioPorUsuario(authLoginDto.usuario)
        const senhaCorreta = usuario.validarSenhaCorreta(usuario.senha)
        if (!senhaCorreta) {
            throw new BadRequestException("Usuário ou senha incorreto")
        }

        return this.gerarTokenAutenticacao(usuario)
    }

    private async gerarTokenAutenticacao(usuario: UsuarioEntity): Promise<AuthTokenDto> {
        const access_token = await this.jwtService.signAsync({ id: usuario.id })
        return { access_token } as AuthTokenDto
    }
 }
