import { Column, Entity } from 'typeorm';
import { EntidadeBase } from '../../compartilhado/entidades/entidade-base';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Entity({ name: 'usuario', schema: 'streaming' })
export class UsuarioEntity extends EntidadeBase {
    @Column({ type: 'varchar', length: 255, nullable: false })
    nome: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    usuario: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: 'text', nullable: false })
    senha: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.senha = await bcrypt.hash(this.senha, 10)
    }


    async validarSenhaCorreta(senha: string): Promise<boolean> {
        return bcrypt.compare(senha, this.senha)
    }
}