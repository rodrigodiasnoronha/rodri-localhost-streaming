import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from '../servicos/auth.service';
import { UsuarioCriarDto } from '../../usuario/dtos/usuario.dto';
import { AuthLoginDto, AuthTokenDecodedDto, AuthTokenDto } from '../dtos/auth.dto';
import { ApiBearerAuth, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('/cadastro')
    @ApiBody({ type: UsuarioCriarDto })
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    async cadastroUsuario(@Body() usuarioCriarDto: UsuarioCriarDto): Promise<AuthTokenDto> {
        return this.authService.cadastroUsuario(usuarioCriarDto);
    }

    @UseGuards(AuthGuard)
    @Get('/cadastro')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    async dadosUsuarioLogado(@Request() requisicao) {
        return this.authService.buscarCadastro(String(requisicao.usuario_id))
    }

    @Post('/login')
    @ApiBody({ type: AuthLoginDto })
    @HttpCode(HttpStatus.OK)
    async loginUsuario(@Body() authLoginDto: AuthLoginDto): Promise<AuthTokenDto> {
        return this.authService.loginUsuario(authLoginDto)
    }
}
