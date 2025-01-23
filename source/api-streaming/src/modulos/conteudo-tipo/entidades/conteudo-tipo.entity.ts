import { Column, Entity } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';

@Entity({ name: 'conteudo_tipo', schema: 'streaming' })
export class ConteudoTipoEntity extends EntidadeBase {
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    nome: string;
}