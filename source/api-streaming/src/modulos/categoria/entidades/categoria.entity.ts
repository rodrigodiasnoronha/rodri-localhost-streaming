import { Column, Entity } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';


@Entity({ name: 'categoria', schema: 'streaming' })
export class CategoriaEntity extends EntidadeBase {
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    nome: string;
}