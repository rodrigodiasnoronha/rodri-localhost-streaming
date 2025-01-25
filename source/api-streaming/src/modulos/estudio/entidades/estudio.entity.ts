
import { Column, Entity, ManyToOne } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';


@Entity({ name: 'estudio', schema: 'streaming' })
export class EstudioEntity extends EntidadeBase {

    @Column({ type: 'text', nullable: false, comment: "Nome do Estúdio" })
    nome: string;
}