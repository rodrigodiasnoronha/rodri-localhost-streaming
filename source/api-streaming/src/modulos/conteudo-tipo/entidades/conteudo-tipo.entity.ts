import { Column, Entity, OneToMany } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';
import { ConteudoEntity } from '../../conteudo/entidades/conteudo.entity';

@Entity({ name: 'conteudo_tipo', schema: 'streaming' })
export class ConteudoTipoEntity extends EntidadeBase {
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    nome: string;

    @OneToMany(() => ConteudoEntity, (conteudo) => conteudo.conteudo_tipo)
    conteudos: ConteudoEntity[];
}