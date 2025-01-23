import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class EntidadeBase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;

    @DeleteDateColumn()
    deletado_em: Date;
}