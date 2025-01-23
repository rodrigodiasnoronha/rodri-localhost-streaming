import { Column, Entity, OneToMany } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';
import { ArquivoEntity } from '../../arquivo/entidades/arquivo.entity';


@Entity({ name: 'arquivo_tipo', schema: 'streaming' })
export class ArquivoTipoEntity extends EntidadeBase {
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    nome: string;

    @OneToMany(() => ArquivoEntity, (arquivo) => arquivo.arquivo_tipo)
    arquivos: ArquivoEntity[]
}