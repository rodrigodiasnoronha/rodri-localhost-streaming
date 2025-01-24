
import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArquivoTipoCriarDto {

    @IsNotEmpty()
    @MaxLength(255, { message: 'O texto deve contér no máximo 255 caracteres'})
    @ApiProperty({
        description: 'Nome do tipo de arquivo. Não pode haver dois tipos com nomes iguais',
        nullable: false,
        default: 'Foto',
        type: String
    })
    nome: string
}

export class ArquivoTipoAtualizarDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'ID do arquivo tipo',
        nullable: false,
        default: "3c5b8827-73a2-4a60-8c11-0bc835654f6a",
        type: String
    })
    id: string;

    @IsNotEmpty()
    @MaxLength(255, { message: 'O texto deve contér no máximo 255 caracteres'})
    @ApiProperty({
        description: 'Nome do tipo de arquivo. Não pode haver dois tipos com nomes iguais',
        nullable: false,
        default: 'Foto',
        type: String
    })
    nome: string
}