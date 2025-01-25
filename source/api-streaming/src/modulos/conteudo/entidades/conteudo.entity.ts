import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';
import { ConteudoTipoEntity } from '../../conteudo-tipo/entidades/conteudo-tipo.entity';
import {
    ClassificacaoIndicativaEntity,
} from '../../classificacao-indicativa/entidades/classificacao-indicativa.entity';
import { EstudioEntity } from '../../estudio/entidades/estudio.entity';
import { ArquivoEntity } from '../../arquivo/entidades/arquivo.entity';
import { CategoriaEntity } from '../../categoria/entidades/categoria.entity';


@Entity({ name: 'conteudo', schema: 'streaming' })
export class ConteudoEntity extends EntidadeBase {
    @Column({ type: 'varchar', length: 255, nullable: false })
    nome: string;

    @Column({ type: 'text', nullable: false })
    sinopse: string;

    @ManyToOne(() => ConteudoTipoEntity, (conteudo_tipo) => conteudo_tipo.conteudos)
    conteudo_tipo: ConteudoTipoEntity;

    @ManyToOne(() => ClassificacaoIndicativaEntity, (classificacao_indicativa) => classificacao_indicativa.conteudos)
    classificacao_indicativa: ClassificacaoIndicativaEntity;

    @ManyToOne(() => EstudioEntity, (estudio) => estudio.conteudos)
    estudio: EstudioEntity;

    @ManyToOne(() => ArquivoEntity, (arquivo) => arquivo.thumbnail)
    thumbnail: ArquivoEntity;

    @ManyToMany(() => CategoriaEntity, (categoria) => categoria.conteudos)
    @JoinTable()
    categorias: CategoriaEntity[]
}