import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaModule } from '../categoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from '../entidades/categoria.entity';
import { CategoriaAtualizarDto, CategoriaCriarDto } from '../dtos/categoria.dto';
import { faker } from '@faker-js/faker';
import { UsuarioEntity } from '../../usuario/entidades/usuario.entity';
import { AuthModule } from '../../auth/auth.module';
import { criarUsuarioParaTeste } from '../../compartilhado/utils/testes';


describe('CategoriaController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [
                        CategoriaEntity,
                        UsuarioEntity
                    ],
                    synchronize: true,
                }),
                CategoriaModule,
                AuthModule
            ],
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

    it('/categoria (POST) - deveria criar uma categoria', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        const categoriaCriarDto: CategoriaCriarDto = {
            nome: faker.word.verb()
        }

        return request(app.getHttpServer())
            .post('/categoria')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(categoriaCriarDto)
            .expect(HttpStatus.CREATED)
            .expect(response => {
                expect(response.body.nome).toBe(categoriaCriarDto.nome)
            })
    })

    it('/categoria (PUT) - deveria atualizar uma categoria', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        const categoriaCriarDto: CategoriaCriarDto = {
            nome: faker.word.verb()
        }

        const responseCategoriaCriar = await request(app.getHttpServer())
            .post('/categoria')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(categoriaCriarDto)
            .expect(HttpStatus.CREATED)

        const categoriaCriada: CategoriaEntity = responseCategoriaCriar.body as CategoriaEntity
        const categoriaAtualizarDto: CategoriaAtualizarDto = {
            nome: faker.word.verb(),
            id: categoriaCriada.id
        }

        return request(app.getHttpServer())
            .put('/categoria')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(categoriaAtualizarDto)
            .expect(HttpStatus.OK)
            .expect(response => {
                expect(response.body.id).toBe(categoriaCriada.id)
                expect(response.body.nome).toBe(categoriaAtualizarDto.nome)
            })
    })

    it('/categoria (DELETE) - deveria apagar uma categoria', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        const categoriaCriarDto: CategoriaCriarDto = {
            nome: faker.word.verb()
        }

        const responseCategoriaCriar = await request(app.getHttpServer())
            .post('/categoria')
            .auth(accessToken.access_token, { type: 'bearer' })
            .send(categoriaCriarDto)
            .expect(HttpStatus.CREATED)

        const categoriaCriada: CategoriaEntity = responseCategoriaCriar.body as CategoriaEntity
        const queryParams = { id: categoriaCriada.id }

        return request(app.getHttpServer())
            .delete('/categoria')
            .auth(accessToken.access_token, { type: 'bearer' })
            .query(queryParams)
            .expect(HttpStatus.NO_CONTENT)
    })
});