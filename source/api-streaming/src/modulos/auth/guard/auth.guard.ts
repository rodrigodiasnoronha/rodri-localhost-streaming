import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as process from 'process';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenDecodedDto } from '../dtos/auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extrairTokenHeaderRequisicao(request);

        if (!token) {
            throw new UnauthorizedException('Token de autorização não encontrado');
        }
        try {
            const usuario: AuthTokenDecodedDto = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET || 'secret',
                },
            );

            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['usuario_id'] = usuario.id;
        } catch {
            throw new UnauthorizedException("");
        }
        return true;
    }

    private extrairTokenHeaderRequisicao(request: Request): string | undefined {
        // @ts-ignore
        const [_, token] = request.headers.authorization?.split(' ') ?? [];
        return token
    }
}
