
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';
import { ArquivoTipoEntity } from '../../arquivo-tipo/entidades/arquivo-tipo.entity';
import { ArquivoResolucaoEnum } from '../../arquivo-resolucao/types';
import { ArquivoResolucaoEntity } from '../../arquivo-resolucao/entidades/arquivo-resolucao.entity';
import { ConteudoEntity } from '../../conteudo/entidades/conteudo.entity';


@Entity({ name: 'arquivo', schema: 'streaming' })
export class ArquivoEntity extends EntidadeBase {

    @Column({ type: 'text', nullable: false, comment: "Somente o nome do arquivo" })
    nome_arquivo: string;

    @Column({  type: 'text', nullable: false, comment: "Somente o path do arquivo, sem o nome dele" })
    caminho: string;

    @Column({ type: 'int8', nullable: false })
    tamanho_bytes: number;

    @ManyToOne(() => ArquivoTipoEntity, (arquivo_tipo) => arquivo_tipo.arquivos)
    arquivo_tipo: ArquivoTipoEntity;

    @ManyToOne(() => ArquivoResolucaoEntity, (arquivo_resolucao) => arquivo_resolucao.arquivo)
    resolucoes: ArquivoResolucaoEntity;

    @OneToMany(() => ConteudoEntity, (conteudo) => conteudo.estudio)
    thumbnail: ConteudoEntity[];
}