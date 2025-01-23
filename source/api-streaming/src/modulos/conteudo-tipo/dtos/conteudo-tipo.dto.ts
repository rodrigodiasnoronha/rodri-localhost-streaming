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