
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArquivoTipoCriarDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome do tipo de arquivo. Não pode haver dois tipos com nomes iguais',
        nullable: false,
        default: 'Foto',
        type: String
    })
    nome: string
}