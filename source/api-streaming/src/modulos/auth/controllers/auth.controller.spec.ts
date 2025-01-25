import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../usuario/entidades/usuario.entity';
import { AuthModule } from '../auth.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { criarUsuarioParaTeste } from '../../compartilhado/utils/testes';
import { faker } from '@faker-js/faker';
import { UsuarioCriarDto } from '../../usuario/dtos/usuario.dto';
import { AuthLoginDto } from '../dtos/auth.dto';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [
                        UsuarioEntity,
                    ],
                    synchronize: true,
                }),
                AuthModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });


    it('/auth/cadastro (POST) - deveria cadastrar um usuário', async () => {
        await criarUsuarioParaTeste(app)
    });

    it('/auth/cadastro (GET) - deveria retornar os dados do usuário logado de acordo com o JWT no Header', async () => {
        const accessToken = await criarUsuarioParaTeste(app)

        return request(app.getHttpServer())
            .get('/auth/cadastro')
            .auth(accessToken.access_token, { type: 'bearer'})
            .expect(HttpStatus.OK)
            .expect(response => {
                expect(response.body.id).toBeDefined()
            })
    })

    it('/auth/cadastro (GET) - deveria retornar 401, pois não tem usuário autenticado', async () => {
        return request(app.getHttpServer())
            .get('/auth/cadastro')
            .expect(HttpStatus.UNAUTHORIZED)
    })

    it('/auth/login (POST) - deveria fazer login do usuário', async () => {
        const usuarioCriarDto: UsuarioCriarDto = {
            usuario: faker.internet.username(),
            email: faker.internet.email(),
            senha: faker.internet.password(),
            nome: faker.person.fullName()
        }
        const authLoginDto: AuthLoginDto = {
            usuario: usuarioCriarDto.usuario,
            senha: usuarioCriarDto.senha
        }

        await criarUsuarioParaTeste(app, usuarioCriarDto)

        return request(app.getHttpServer())
            .post('/auth/login')
            .send(authLoginDto)
            .expect(HttpStatus.OK)
            .expect(response => {
                expect(response.body.access_token).toBeDefined()
            })
    })
});
