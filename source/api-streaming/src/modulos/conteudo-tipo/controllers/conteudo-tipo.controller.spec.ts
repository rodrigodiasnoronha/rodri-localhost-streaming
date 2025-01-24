import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConteudoTipoEntity } from '../entidades/conteudo-tipo.entity';
import * as request from 'supertest';
import { ConteudoTipoModule } from '../conteudo-tipo.module';
import { faker } from '@faker-js/faker';
import { ConteudoTipoAtualizarDto, ConteudoTipoCriarDto } from '../dtos/conteudo-tipo.dto';
import { criarUsuarioParaTeste } from '../../compartilhado/utils/testes';
import { AuthModule } from '../../auth/auth.module';
import { UsuarioEntity } from '../../usuario/entidades/usuario.entity';


describe('ConteudoTipoController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [
                        ConteudoTipoEntity,
                        UsuarioEntity
                    ],
                    synchronize: true,
                }),
                ConteudoTipoModule,
                AuthModule
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });


    it('/conteudo-tipo (GET) - deveria retornar todos os tipos de conteúdo', async () => {

        return request(app.getHttpServer())
            .get('/conteudo-tipo')
            .expect(HttpStatus.OK)
            .expect(response => {
                if (!Array.isArray(response.body)) {
                    throw new Error('O body da response não é um array');
                }
            });
    });


    it('/conteudo-tipo (POST) - deveria criar um tipo de conteúdo', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        const conteudoTipoCriarDto: ConteudoTipoCriarDto = {
            nome: faker.word.verb(),
        };

        return request(app.getHttpServer())
            .post('/conteudo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(conteudoTipoCriarDto)
            .expect(HttpStatus.CREATED)
            .expect(response => {
                expect(response.body.nome).toBe(conteudoTipoCriarDto.nome);
            });
    });


    it('/conteudo-tipo (PUT) - deveria atualizar um tipo de conteúdo', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        const conteudoTipoCriarDto: ConteudoTipoCriarDto = {
            nome: faker.word.verb(),
        };

        const responseConteudoTipoCriar = await request(app.getHttpServer())
            .post('/conteudo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(conteudoTipoCriarDto)
            .expect(HttpStatus.CREATED);

        const conteudoTipoCriado: ConteudoTipoEntity = responseConteudoTipoCriar.body as ConteudoTipoEntity;
        const conteudoTipoAtualizarDto: ConteudoTipoAtualizarDto = {
            nome: faker.word.verb(),
            id: conteudoTipoCriado.id,
        };

        return request(app.getHttpServer())
            .put('/conteudo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(conteudoTipoAtualizarDto)
            .expect(HttpStatus.OK)
            .expect(response => {
                expect(response.body.id).toBe(conteudoTipoCriado.id);
                expect(response.body.nome).toBe(conteudoTipoAtualizarDto.nome);
            });
    });


    it('/conteudo-tipo (DELETE) - deveria apagar um tipo de conteúdo', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        const conteudoTipoCriarDto: ConteudoTipoCriarDto = {
            nome: faker.word.verb(),
        };

        const responseConteudoTipoCriar = await request(app.getHttpServer())
            .post('/conteudo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(conteudoTipoCriarDto)
            .expect(HttpStatus.CREATED);

        const conteudoTipoCriado: ConteudoTipoEntity = responseConteudoTipoCriar.body as ConteudoTipoEntity;
        const queryParams = { id: conteudoTipoCriado.id };

        return request(app.getHttpServer())
            .delete('/conteudo-tipo')
            .auth(accessToken.access_token, { type: 'bearer' })
            .query(queryParams)
            .expect(HttpStatus.NO_CONTENT);
    });

});