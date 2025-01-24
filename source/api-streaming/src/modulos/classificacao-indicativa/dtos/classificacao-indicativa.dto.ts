import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClassificacaoIndicativaCriarDto {

    @IsNotEmpty()
    @MaxLength(255, { message: 'O texto deve contér no máximo 255 caracteres'})
    @ApiProperty({
        description: 'Nome da classificação indicativa. Não pode haver duas classificações indicativas com nomes iguais',
        nullable: false,
        default: 'Livre',
        type: String
    })
    nome: string

    @IsNotEmpty()
    @ApiProperty({
        description: 'Descrição da classificação indicativa',
        nullable: false,
        default: 'Para todas as idades',
        type: String
    })
    @MaxLength(255, { message: 'O texto deve contér no máximo 255 caracteres'})
    descricao: string;
}

export class ClassificacaoIndicativaAtualizarDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'ID da classificação indicativa',
        nullable: false,
        default: "3c5b8827-73a2-4a60-8c11-0bc835654f6a",
        type: String
    })
    id: string;

    @IsNotEmpty()
    @MaxLength(255, { message: 'O texto deve contér no máximo 255 caracteres'})
    @ApiProperty({
        description: 'Nome da classificação indicativa. Não pode haver duas classificações indicativas com nomes iguais',
        nullable: false,
        default: 'Livre',
        type: String
    })
    nome: string

    @IsNotEmpty()
    @MaxLength(255, { message: 'O texto deve contér no máximo 255 caracteres'})
    @ApiProperty({
        description: 'Descrição da classificação indicativa',
        nullable: false,
        default: 'Para todas as idades',
        type: String
    })
    descricao: string;
}