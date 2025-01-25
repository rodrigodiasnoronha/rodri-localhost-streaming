import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthTokenDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Token de acesso',
        nullable: false,
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhYzRhMGZjLTk4MTQtNGM5OS04MjZjLTVmYzgyY2VjMDE4ZSIsImlhdCI6MTczNzc2NDI0MSwiZXhwIjoxNzM3ODUwNjQxfQ.LSklAIydYtpyez0mlh0614aKUlcUupkGDMEYeWRY5oA',
        type: String,
    })
    access_token: string;
}

export class AuthTokenDecodedDto {
    id: string;
}

export class AuthLoginDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'Usuário para login',
        nullable: false,
        default: 'rodri',
        type: String,
    })
    usuario: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Senha para login',
        nullable: false,
        default: 'senha123',
        type: String,
    })
    senha: string;
}