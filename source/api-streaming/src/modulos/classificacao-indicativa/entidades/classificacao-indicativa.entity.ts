import { Column, Entity, OneToMany } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';
import { ConteudoEntity } from '../../conteudo/entidades/conteudo.entity';


@Entity({ name: 'classificacao_indicativa', schema: 'streaming' })
export class ClassificacaoIndicativaEntity extends EntidadeBase {

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    nome: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    descricao: string;

    @OneToMany(() => ConteudoEntity, (conteudo) => conteudo.classificacao_indicativa)
    conteudos: ConteudoEntity[];
}