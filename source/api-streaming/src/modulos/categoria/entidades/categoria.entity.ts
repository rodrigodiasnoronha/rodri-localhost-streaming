import { Column, Entity, ManyToMany } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';
import { ConteudoEntity } from '../../conteudo/entidades/conteudo.entity';


@Entity({ name: 'categoria', schema: 'streaming' })
export class CategoriaEntity extends EntidadeBase {
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    nome: string;


    @ManyToMany(() => ConteudoEntity, (conteudo) => conteudo.categorias)
    conteudos: ConteudoEntity[]
}