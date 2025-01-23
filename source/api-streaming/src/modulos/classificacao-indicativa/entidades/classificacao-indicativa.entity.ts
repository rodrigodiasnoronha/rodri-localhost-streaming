
import { Column, Entity } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';


@Entity({ name: 'classificacao_indicativa', schema: 'streaming' })
export class ClassificacaoIndicativaEntity extends EntidadeBase {

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    nome: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    descricao: string;
}