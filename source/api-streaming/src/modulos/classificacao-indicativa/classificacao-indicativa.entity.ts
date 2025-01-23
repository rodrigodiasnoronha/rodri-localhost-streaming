
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'classificacao_indicativa' })
export class ClassificacaoIndicativaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    nome: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    descricao: string;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;

    @DeleteDateColumn()
    deletado_em: Date;
}