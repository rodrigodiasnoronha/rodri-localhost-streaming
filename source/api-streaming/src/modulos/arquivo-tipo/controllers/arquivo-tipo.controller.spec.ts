import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { UsuarioEntity } from '../../usuario/entidades/usuario.entity';
import { AuthModule } from '../../auth/auth.module';
import { criarUsuarioParaTeste } from '../../compartilhado/utils/testes';
import { ArquivoTipoEntity } from '../entidades/arquivo-tipo.entity';
import { ArquivoTipoModule } from '../arquivo-tipo.module';
import { ArquivoEntity } from '../../arquivo/entidades/arquivo.entity';
import { ArquivoModule } from '../../arquivo/arquivo.module';
import { ArquivoResolucaoEntity } from '../../arquivo-resolucao/entidades/arquivo-resolucao.entity';
import { ArquivoTipoAtualizarDto, ArquivoTipoCriarDto } from '../dtos/arquivo-tipo.dto';
import { ConteudoEntity } from '../../conteudo/entidades/conteudo.entity';
import { ConteudoModule } from '../../conteudo/conteudo.module';
import { ConteudoTipoEntity } from '../../conteudo-tipo/entidades/conteudo-tipo.entity';
import {
    ClassificacaoIndicativaEntity,
} from '../../classificacao-indicativa/entidades/classificacao-indicativa.entity';
import { EstudioEntity } from '../../estudio/entidades/estudio.entity';
import { CategoriaEntity } from '../../categoria/entidades/categoria.entity';


describe('ArquivoTipoController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [
                        ArquivoResolucaoEntity,
                        ArquivoTipoEntity,
                        UsuarioEntity,
                        ArquivoEntity,
                        ConteudoEntity,
                        ConteudoTipoEntity,
                        ClassificacaoIndicativaEntity,
                        EstudioEntity,
                        CategoriaEntity
                    ],
                    synchronize: true,
                }),
                ArquivoTipoModule,
                ArquivoModule,
                ConteudoModule,
                AuthModule,
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });


    it('/arquivo-tipo (GET) - deveria retornar todos os tipos de arquivo', () => {
        return request(app.getHttpServer())
            .get('/arquivo-tipo')
            .expect(HttpStatus.OK)
            .expect(response => {
                if (!Array.isArray(response.body)) {
                    throw new Error("O body da response não é um array")
                }
            })
    })

    it('/arquivo-tipo (POST) - deveria criar um tipo de arquivo', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        const arquivoTipoCriarDto: ArquivoTipoCriarDto = {
            nome: faker.word.verb()
        }

        return request(app.getHttpServer())
            .post('/arquivo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(arquivoTipoCriarDto)
            .expect(HttpStatus.CREATED)
            .expect(response => {
                expect(response.body.nome).toBe(arquivoTipoCriarDto.nome)
            })
    })


    it('/arquivo-tipo (PUT) - deveria atualizar um tipo de arquivo', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        const arquivoTipoCriarDto: ArquivoTipoCriarDto = {
            nome: faker.word.verb()
        }

        const responseArquivoTipoCriar = await request(app.getHttpServer())
            .post('/arquivo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(arquivoTipoCriarDto)
            .expect(HttpStatus.CREATED)

        const arquivoTipoCriado: ArquivoTipoEntity = responseArquivoTipoCriar.body as ArquivoTipoEntity
        const arquivoTipoAtualizarDto: ArquivoTipoAtualizarDto = {
            nome: faker.word.verb(),
            id: arquivoTipoCriado.id
        }

        return request(app.getHttpServer())
            .put('/arquivo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(arquivoTipoAtualizarDto)
            .expect(HttpStatus.OK)
            .expect(response => {
                expect(response.body.id).toBe(arquivoTipoCriado.id)
                expect(response.body.nome).toBe(arquivoTipoAtualizarDto.nome)
            })
    })

    it('/arquivo-tipo (DELETE) - deveria apagar um tipo de arquivo', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        const arquivoTipoCriarDto: ArquivoTipoCriarDto = {
            nome: faker.word.verb()
        }

        const responseArquivoTipoCriar = await request(app.getHttpServer())
            .post('/arquivo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(arquivoTipoCriarDto)
            .expect(HttpStatus.CREATED)

        const arquivoTipoCriado: ArquivoTipoEntity = responseArquivoTipoCriar.body as ArquivoTipoEntity
        const queryParams = { id: arquivoTipoCriado.id }

        return request(app.getHttpServer())
            .delete('/arquivo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .query(queryParams)
            .expect(HttpStatus.NO_CONTENT)
    })
});