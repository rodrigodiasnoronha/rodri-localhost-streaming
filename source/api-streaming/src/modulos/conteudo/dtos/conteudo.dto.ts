import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class ConteudoPaginadoQueryParamsDto {
    @ApiProperty({
        description: 'Número da página',
        nullable: false,
        default: 1,
        type: Number,
        minimum: 1,
    })
    @IsNotEmpty()
    pagina: number;


    @ApiProperty({
        description: 'Limite de itens retornados',
        nullable: false,
        default: 10,
        type: Number,
        minimum: 10,
        maximum: 50,
    })
    @IsNotEmpty()
    limite: number;
}

export class ConteudoCriarDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @ApiProperty({
        description: 'Nome/título do conteúdo',
        nullable: false,
        default: "Harry Potter e o Calíce de Fogo",
        type: String
    })
    nome: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Sinopse',
        nullable: false,
        default: "sinopse",
        type: String
    })
    sinopse: string;


    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @ApiProperty({
        description: 'ID do tipo de conteúdo',
        nullable: false,
        default: 1,
        type: Number
    })
    conteudo_tipo: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @ApiProperty({
        description: 'ID da Classificação Indicativa',
        nullable: false,
        default: 1,
        type: Number
    })
    classificacao_indicativa: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @ApiProperty({
        description: 'ID do estúdio',
        nullable: false,
        default: 1,
        type: Number
    })
    estudio: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @ApiProperty({
        description: 'ID do arquivo (thumbnail)',
        nullable: false,
        default: 1,
        type: Number
    })
    thumbnail: number;


    @IsNotEmpty()
    @IsArray()
    @IsInt({ each: true })
    @Min(0, { each: true })
    @ApiProperty({
        description: 'Array de IDS da categoria relacionada',
        nullable: false,
        default: [],
        type: Array
    })
    categorias: number[];
}