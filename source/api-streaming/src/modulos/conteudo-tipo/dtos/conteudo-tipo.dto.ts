import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConteudoTipoCriarDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome do tipo de conteúdo. Não pode haver dois tipos com nomes iguais',
        nullable: false,
        default: 'Filme',
        type: String
    })
    nome: string
}

export class ConteudoTipoAtualizarDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'ID da do conteúdo tipo',
        nullable: false,
        default: "3c5b8827-73a2-4a60-8c11-0bc835654f6a",
        type: String
    })
    id: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome do tipo de conteúdo. Não pode haver dois tipos com nomes iguais',
        nullable: false,
        default: 'Filme',
        type: String
    })
    nome: string
}