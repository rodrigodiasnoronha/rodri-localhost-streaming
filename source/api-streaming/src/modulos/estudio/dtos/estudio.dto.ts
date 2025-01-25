import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EstudioCriarDto {

    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({
        description: 'Nome do Estúdio. Não pode haver dois estúdios com nomes iguais',
        nullable: false,
        default: 'Toei Animation',
        type: String
    })
    nome: string
}


export class EstudioAtualizarDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'ID do Estúdio',
        nullable: false,
        default: "3c5b8827-73a2-4a60-8c11-0bc835654f6a",
        type: String
    })
    id: string;

    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({
        description: 'Nome do Estúdio. Não pode haver dois estúdios com nomes iguais',
        nullable: false,
        default: 'Toei Animation',
        type: String
    })
    nome: string
}
