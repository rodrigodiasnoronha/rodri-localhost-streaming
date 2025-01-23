import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriaCriarDto {

    @IsNotEmpty()
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
    @ApiProperty({
        description: 'Nome da categoria. Não pode haver duas categorias com nomes iguais',
        nullable: false,
        default: 'Drama',
        type: String
    })
    nome: string
}