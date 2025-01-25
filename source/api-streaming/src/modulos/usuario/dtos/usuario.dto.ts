import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioCriarDto {
    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({
        description: 'Nome do usuário',
        nullable: false,
        default: "Rodrigo",
        type: String
    })
    nome: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'Email do usuário',
        nullable: false,
        default: "rodrigo@email.com",
        type: String
    })
    email: string;

    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({
        description: 'Username do usuário',
        nullable: false,
        default: "rodri",
        type: String
    })
    usuario: string;


    @IsNotEmpty()
    @MinLength(4)
    @ApiProperty({
        description: 'Senha do usuário',
        nullable: false,
        default: "senha123",
        type: String
    })
    senha: string;
}