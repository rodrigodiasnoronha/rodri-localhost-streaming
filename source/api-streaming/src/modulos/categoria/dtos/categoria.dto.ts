import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriaCriarDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome da categoria. Não pode haver duas categorias com nomes iguais',
        nullable: false,
        default: 'Anime',
        type: String
    })
    nome: string
}