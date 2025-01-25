import { Column, Entity, OneToMany } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';
import { ConteudoEntity } from '../../conteudo/entidades/conteudo.entity';


@Entity({ name: 'estudio', schema: 'streaming' })
export class EstudioEntity extends EntidadeBase {

    @Column({ type: 'text', nullable: false, comment: 'Nome do Estúdio' })
    nome: string;

    @OneToMany(() => ConteudoEntity, (conteudo) => conteudo.estudio)
    conteudos: ConteudoEntity[];
}