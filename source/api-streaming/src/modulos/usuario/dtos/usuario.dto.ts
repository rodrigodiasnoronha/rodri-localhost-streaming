import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UsuarioCriarDto {
    @IsNotEmpty()
    @MaxLength(255)
    nome: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(255)
    usuario: string;


    @IsNotEmpty()
    @MinLength(4)
    senha: string;
}