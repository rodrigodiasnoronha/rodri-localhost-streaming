import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClassificacaoIndicativaCriarDto {

    @IsNotEmpty()
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
    descricao: string;
}