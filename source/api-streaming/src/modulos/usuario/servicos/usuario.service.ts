import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../entidades/usuario.entity';
import { ILike, Not, Repository } from 'typeorm';
import { UsuarioCriarDto } from '../dtos/usuario.dto';
import { CategoriaEntity } from '../../categoria/entidades/categoria.entity';
import { isEmail } from 'class-validator';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {
    }

    async criar(usuarioCriarDto: UsuarioCriarDto): Promise<UsuarioEntity> {
        return this.usuarioRepository.manager.transaction(async (transaction) => {
            const usuarioCriado = transaction.create(UsuarioEntity, {
                nome: usuarioCriarDto.nome,
                usuario: usuarioCriarDto.usuario,
                email: usuarioCriarDto.email,
                senha: usuarioCriarDto.senha
            });

            return await transaction.save(usuarioCriado);
        });
    }


    /**
     *
     * Verifica se o usuário ou email estão em uso
     *
     * @param usuario
     * @param email
     *
     */
    async verificarUsuarioEEmailEmUso(usuario: string, email: string): Promise<void> {
        const usuarioEmUso = await this.usuarioRepository.find({
            where: {
                usuario: ILike(`%${usuario}%`),
            },
            withDeleted: true
        })

        if (usuarioEmUso.length) {
            throw new BadRequestException(`O usuário '${usuario}' já esta em uso.`);
        }

        const emailEmUso = await this.usuarioRepository.find({
            where: {
                email: ILike(`%${email}%`),
            },
            withDeleted: true
        })

        if (usuarioEmUso.length) {
            throw new BadRequestException(`O e-mail '${emailEmUso}' já esta em uso.`);
        }
    }

    async buscarUsuarioPorEmail(email: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOneBy({ email });

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return usuario;
    }

    async buscarUsuarioPorId(id: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOneBy({ id });

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return usuario;
    }

}
