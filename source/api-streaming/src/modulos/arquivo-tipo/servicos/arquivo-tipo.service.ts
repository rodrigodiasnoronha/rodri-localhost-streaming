import { BadRequestException, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { ArquivoTipoCriarDto } from '../dtos/arquivo-tipo.dto';
import { ArquivoTipoEntity } from '../entidades/arquivo-tipo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArquivoTipoService {

    constructor(
        @InjectRepository(ArquivoTipoEntity)
        private readonly arquivoTipoRepository: Repository<ArquivoTipoEntity>
    ) {
    }

    async tudo(): Promise<ArquivoTipoEntity[]> {
        return this.arquivoTipoRepository.find({ select: ["id", "nome"] })
    }

    async criar(arquivoTipoCriarDto: ArquivoTipoCriarDto): Promise<ArquivoTipoEntity> {
        return this.arquivoTipoRepository.manager.transaction(async (transaction) => {

            const arquivoTipoExiste = await transaction.find(ArquivoTipoEntity, {
                where: {
                    nome: ILike(`%${arquivoTipoCriarDto.nome}%`),
                },
                withDeleted: true
            });

            if (arquivoTipoExiste.length) {
                throw new BadRequestException(`O tipo de arquivo '${arquivoTipoCriarDto.nome}' já existe.`);
            }

            const arquivoTipoCriado = transaction.create(ArquivoTipoEntity, {
                nome: arquivoTipoCriarDto.nome,
            });

            return await transaction.save(arquivoTipoCriado);
        });
    }
}
