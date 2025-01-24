import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriaCriarDto {

    @IsNotEmpty()
    @MaxLength(255, { message: 'O texto deve contér no máximo 255 caracteres'})
    @ApiProperty({
        description: 'Nome da categoria. Não pode haver duas categorias com nomes iguais',
        nullable: false,
        default: 'Drama',
        type: String
    })
    nome: string
}

export class CategoriaAtualizarDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'ID da categoria',
        nullable: false,
        default: "3c5b8827-73a2-4a60-8c11-0bc835654f6a",
        type: String
    })
    id: string;

    @IsNotEmpty()
    @MaxLength(255, { message: 'O texto deve contér no máximo 255 caracteres'})
    @ApiProperty({
        description: 'Nome da categoria. Não pode haver duas categorias com nomes iguais',
        nullable: false,
        default: 'Drama',
        type: String
    })
    nome: string
}