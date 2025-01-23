import { BadRequestException, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { ConteudoTipoEntity } from '../entidades/conteudo-tipo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConteudoTipoCriarDto } from '../dtos/conteudo-tipo.dto';

@Injectable()
export class ConteudoTipoService {
    constructor(
        @InjectRepository(ConteudoTipoEntity)
        private readonly conteudoTipoRepository: Repository<ConteudoTipoEntity>
    ) {
    }

    tudo(): Promise<ConteudoTipoEntity[]> {
        return this.conteudoTipoRepository.find({ select: ["id", "nome"] });
    }

    async criar(conteudoTipoCriarDto: ConteudoTipoCriarDto): Promise<ConteudoTipoEntity> {
        return this.conteudoTipoRepository.manager.transaction(async (transaction) => {

            const conteudoTipoExiste = await transaction.find(ConteudoTipoEntity, {
                where: {
                    nome: ILike(`%${conteudoTipoCriarDto.nome}%`),
                },
                withDeleted: true
            });

            if (conteudoTipoExiste.length) {
                throw new BadRequestException(`A tipo de conteúdo '${conteudoTipoCriarDto.nome}' já existe.`);
            }

            const conteudoTipoCriado = transaction.create(ConteudoTipoEntity, {
                nome: conteudoTipoCriarDto.nome,
            });

            return await transaction.save(conteudoTipoCriado);
        });
    }

    async deletar(id: string) {
        return await this.conteudoTipoRepository.softDelete(id)
    }
}
