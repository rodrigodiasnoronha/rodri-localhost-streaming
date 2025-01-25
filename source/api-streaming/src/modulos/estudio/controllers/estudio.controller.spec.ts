import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../usuario/entidades/usuario.entity';
import { AuthModule } from '../../auth/auth.module';
import { EstudioEntity } from '../entidades/estudio.entity';
import { EstudioModule } from '../estudio.module';
import { criarUsuarioParaTeste } from '../../compartilhado/utils/testes';
import { EstudioAtualizarDto, EstudioCriarDto } from '../dtos/estudio.dto';
import { faker } from '@faker-js/faker';
import { ConteudoEntity } from '../../conteudo/entidades/conteudo.entity';
import {
  ClassificacaoIndicativaEntity,
} from '../../classificacao-indicativa/entidades/classificacao-indicativa.entity';
import { ArquivoEntity } from '../../arquivo/entidades/arquivo.entity';
import { ArquivoTipoEntity } from '../../arquivo-tipo/entidades/arquivo-tipo.entity';
import { ArquivoResolucaoEntity } from '../../arquivo-resolucao/entidades/arquivo-resolucao.entity';
import { ConteudoTipoEntity } from '../../conteudo-tipo/entidades/conteudo-tipo.entity';
import { CategoriaEntity } from '../../categoria/entidades/categoria.entity';


describe('EstudioController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [
            EstudioEntity,
            UsuarioEntity,
            ConteudoEntity,
            ConteudoTipoEntity,
            ClassificacaoIndicativaEntity,
            EstudioEntity,
            ArquivoEntity,
            ArquivoTipoEntity,
            ArquivoResolucaoEntity,
            CategoriaEntity,
          ],
          synchronize: true,
        }),
        EstudioModule,
        AuthModule
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  it('/estudio (GET) - deveria retornar todos os estúdios', () => {
    return request(app.getHttpServer())
        .get('/estudio')
        .expect(HttpStatus.OK)
        .expect(response => {
          if (!Array.isArray(response.body)) {
            throw new Error("O body da response não é um array")
          }
        })
  })

  it('/estudio (POST) - deveria criar um estúdio', async () => {
    const accessToken = await criarUsuarioParaTeste(app)

    const estudioCriarDto: EstudioCriarDto = {
      nome: faker.word.verb()
    }

    return request(app.getHttpServer())
        .post('/estudio')
        .auth(accessToken.access_token, { type: 'bearer' })
        .send(estudioCriarDto)
        .expect(HttpStatus.CREATED)
        .expect(response => {
          expect(response.body.nome).toBe(estudioCriarDto.nome)
        })
  })

  it('/estudio (PUT) - deveria atualizar um estúdio', async () => {
    const accessToken = await criarUsuarioParaTeste(app)

    const estudioCriarDto: EstudioCriarDto = {
      nome: faker.word.verb()
    }

    const responseEstudioCriar = await request(app.getHttpServer())
        .post('/estudio')
        .auth(accessToken.access_token, { type: 'bearer' })
        .send(estudioCriarDto)
        .expect(HttpStatus.CREATED)

    const estudioCriado: EstudioEntity = responseEstudioCriar.body as EstudioEntity
    const estudioAtualizarDto: EstudioAtualizarDto = {
      nome: faker.word.verb(),
      id: estudioCriado.id
    }

    return request(app.getHttpServer())
        .put('/estudio')
        .auth(accessToken.access_token, { type: 'bearer' })
        .send(estudioAtualizarDto)
        .expect(HttpStatus.OK)
        .expect(response => {
          expect(response.body.id).toBe(estudioCriado.id)
          expect(response.body.nome).toBe(estudioAtualizarDto.nome)
        })
  })

  it('/estudio (DELETE) - deveria apagar um estúdio', async () => {
    const accessToken = await criarUsuarioParaTeste(app)

    const estudioCriarDto: EstudioCriarDto = {
      nome: faker.word.verb()
    }

    const responseEstudioCriar = await request(app.getHttpServer())
        .post('/estudio')
        .auth(accessToken.access_token, { type: 'bearer' })
        .send(estudioCriarDto)
        .expect(HttpStatus.CREATED)

    const estudioCriado: EstudioEntity = responseEstudioCriar.body as EstudioEntity
    const queryParams = { id: estudioCriado.id }

    return request(app.getHttpServer())
        .delete('/estudio')
        .auth(accessToken.access_token, { type: 'bearer' })
        .query(queryParams)
        .expect(HttpStatus.NO_CONTENT)
  })
});