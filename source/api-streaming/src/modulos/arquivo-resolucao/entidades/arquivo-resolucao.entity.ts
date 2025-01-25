
import { Column, Entity, ManyToOne } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';
import { ArquivoTipoEntity } from '../../arquivo-tipo/entidades/arquivo-tipo.entity';
import { ArquivoResolucaoEnum } from '../types';
import { ArquivoEntity } from '../../arquivo/entidades/arquivo.entity';


@Entity({ name: 'arquivo_resolucao', schema: 'streaming' })
export class ArquivoResolucaoEntity extends EntidadeBase {

    @Column({ type: "varchar", nullable: false })
    resolucao: ArquivoResolucaoEnum;

    @Column({  type: 'text', nullable: false })
    url: string;

    @Column({ type: 'int8', nullable: false })
    bitrate: number;

    @Column({ type: 'int', nullable: false, default: 30 })
    fps: number;

    @ManyToOne(() => ArquivoEntity, (arquivo) => arquivo.resolucoes)
    arquivo: ArquivoEntity;
}