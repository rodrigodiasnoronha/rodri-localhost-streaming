import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificacaoIndicativaModule } from '../classificacao-indicativa.module';
import { ClassificacaoIndicativaEntity } from '../entidades/classificacao-indicativa.entity';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import {
    ClassificacaoIndicativaAtualizarDto,
    ClassificacaoIndicativaCriarDto,
} from '../dtos/classificacao-indicativa.dto';


describe('ClassificacaoIndicativaController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [
                        ClassificacaoIndicativaEntity,
                    ],
                    synchronize: true,
                }),
                ClassificacaoIndicativaModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/classificacao-indicativa (GET) - deveria retornar todas as classificações indicativas', () => {
        return request(app.getHttpServer())
            .get('/classificacao-indicativa')
            .expect(HttpStatus.OK)
            .expect(response => {
                if (!Array.isArray(response.body)) {
                    throw new Error('O body da response não é um array');
                }
            });
    });


    it('/classificacao-indicativa (POST) - deveria criar uma classificação indicativa', () => {
        const classificacaoIndicativaCriarDto: ClassificacaoIndicativaCriarDto = {
            nome: faker.word.verb(),
            descricao: faker.lorem.words(5),
        };

        return request(app.getHttpServer())
            .post('/classificacao-indicativa')
            .send(classificacaoIndicativaCriarDto)
            .expect(HttpStatus.CREATED)
            .expect(response => {
                expect(response.body.nome).toBe(classificacaoIndicativaCriarDto.nome);
            });
    });


    it('/classificacao-indicativa (PUT) - deveria atualizar uma classificação indicativa', async () => {
        const classificacaoIndicativaCriarDto: ClassificacaoIndicativaCriarDto = {
            nome: faker.word.verb(),
            descricao: faker.lorem.words(5),
        };

        const responseClassificacaoIndicativaCriar = await request(app.getHttpServer())
            .post('/classificacao-indicativa')
            .send(classificacaoIndicativaCriarDto)
            .expect(HttpStatus.CREATED);

        const classificacaoIndicativaCriada: ClassificacaoIndicativaEntity = responseClassificacaoIndicativaCriar.body as ClassificacaoIndicativaEntity;
        const classificacaoIndicativaAtualizarDto: ClassificacaoIndicativaAtualizarDto = {
            nome: faker.word.verb(),
            descricao: faker.lorem.words(5),
            id: classificacaoIndicativaCriada.id,
        };

        return request(app.getHttpServer())
            .put('/classificacao-indicativa')
            .send(classificacaoIndicativaAtualizarDto)
            .expect(HttpStatus.OK)
            .expect(response => {
                expect(response.body.id).toBe(classificacaoIndicativaCriada.id);
                expect(response.body.nome).toBe(classificacaoIndicativaAtualizarDto.nome);
            });
    });

    it('/classificacao-indicativa (DELETE) - deveria apagar uma classificação indicativa', async () => {
        const classificacaoIndicativaCriarDto: ClassificacaoIndicativaCriarDto = {
            nome: faker.word.verb(),
            descricao: faker.lorem.words(5),
        };

        const responseClassificacaoIndicativaCriar = await request(app.getHttpServer())
            .post('/classificacao-indicativa')
            .send(classificacaoIndicativaCriarDto)
            .expect(HttpStatus.CREATED);

        const classificacaoIndicativaCriada: ClassificacaoIndicativaEntity = responseClassificacaoIndicativaCriar.body as ClassificacaoIndicativaEntity;
        const queryParams = { id: classificacaoIndicativaCriada.id };

        return request(app.getHttpServer())
            .delete('/classificacao-indicativa')
            .query(queryParams)
            .expect(HttpStatus.NO_CONTENT);
    });
});