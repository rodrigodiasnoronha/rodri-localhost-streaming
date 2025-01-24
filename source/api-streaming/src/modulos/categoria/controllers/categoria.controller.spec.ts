import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaModule } from '../categoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from '../entidades/categoria.entity';
import { CategoriaCriarDto } from '../dtos/categoria.dto';
import { faker } from '@faker-js/faker';


describe('CategoriaController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [
                        CategoriaEntity
                    ],
                    synchronize: true,
                }),
                CategoriaModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });


    it('/categoria (GET) - deveria retornar todas as categorias', () => {
        return request(app.getHttpServer())
            .get('/categoria')
            .expect(HttpStatus.OK)
            .expect(response => {
                if (!Array.isArray(response.body)) {
                    throw new Error("O body da response não é um array")
                }
            })
    })

    it('/categoria (POST) - deveria criar uma categoria', () => {
        const categoriaCriarDto: CategoriaCriarDto = {
            nome: faker.word.verb()
        }

        return request(app.getHttpServer())
            .post('/categoria')
            .send(categoriaCriarDto)
            .expect(HttpStatus.CREATED)
            .expect(response => {
                if (response.body.nome != categoriaCriarDto.nome) {
                    throw new Error("Categoria 'nome' diferente da categoria criada")
                }
            })
    })


});