import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { ArquivoTipoEntity } from '../../arquivo-tipo/entidades/arquivo-tipo.entity';
import { ArquivoEntity } from '../../arquivo/entidades/arquivo.entity';
import { ArquivoResolucaoEntity } from '../../arquivo-resolucao/entidades/arquivo-resolucao.entity';
import { ConteudoEntity } from '../entidades/conteudo.entity';
import { ConteudoModule } from '../conteudo.module';
import { ConteudoTipoEntity } from '../../conteudo-tipo/entidades/conteudo-tipo.entity';
import {
    ClassificacaoIndicativaEntity,
} from '../../classificacao-indicativa/entidades/classificacao-indicativa.entity';
import { EstudioEntity } from '../../estudio/entidades/estudio.entity';
import { ConteudoPaginadoQueryParamsDto } from '../dtos/conteudo.dto';
import { CategoriaEntity } from '../../categoria/entidades/categoria.entity';


describe('ConteudoController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [
                        ConteudoEntity,
                        ConteudoTipoEntity,
                        ClassificacaoIndicativaEntity,
                        EstudioEntity,
                        ArquivoEntity,
                        ArquivoTipoEntity,
                        ArquivoResolucaoEntity,
                        CategoriaEntity
                    ],
                    synchronize: true,
                }),
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

    it('Deveria estar definido', () => {
        expect(app).toBeDefined()
    })


    it('/conteudo/paginado (GET) - deveria ser capaz de retornar os conteúdos paginados', () => {
        const conteudoPaginadoQueryParamsDto: ConteudoPaginadoQueryParamsDto = {
            pagina: 1,
            limite: 10
        }

      return request(app.getHttpServer())
          .get('/conteudo/paginado')
          .query(conteudoPaginadoQueryParamsDto)
          .expect(HttpStatus.OK)
          .expect(response => {
              if (!Array.isArray(response.body.data)) {
                  throw new Error("O 'data' do body não é um array")
              }

              if (!Number.isInteger(response.body.total)) {
                  throw new Error("O total não é um número inteiro")
              }
          })
    })

    // it('/arquivo-tipo (POST) - deveria criar um tipo de arquivo', async () => {
    //   const accessToken = await criarUsuarioParaTeste(app)
    //
    //   const arquivoTipoCriarDto: ArquivoTipoCriarDto = {
    //     nome: faker.word.verb()
    //   }
    //
    //   return request(app.getHttpServer())
    //       .post('/arquivo-tipo')
    //       .auth(accessToken.access_token, { type: 'bearer' })
    //       .send(arquivoTipoCriarDto)
    //       .expect(HttpStatus.CREATED)
    //       .expect(response => {
    //         expect(response.body.nome).toBe(arquivoTipoCriarDto.nome)
    //       })
    // })
    //
    //
    // it('/arquivo-tipo (PUT) - deveria atualizar um tipo de arquivo', async () => {
    //   const accessToken = await criarUsuarioParaTeste(app)
    //
    //   const arquivoTipoCriarDto: ArquivoTipoCriarDto = {
    //     nome: faker.word.verb()
    //   }
    //
    //   const responseArquivoTipoCriar = await request(app.getHttpServer())
    //       .post('/arquivo-tipo')
    //       .auth(accessToken.access_token, { type: 'bearer' })
    //       .send(arquivoTipoCriarDto)
    //       .expect(HttpStatus.CREATED)
    //
    //   const arquivoTipoCriado: ArquivoTipoEntity = responseArquivoTipoCriar.body as ArquivoTipoEntity
    //   const arquivoTipoAtualizarDto: ArquivoTipoAtualizarDto = {
    //     nome: faker.word.verb(),
    //     id: arquivoTipoCriado.id
    //   }
    //
    //   return request(app.getHttpServer())
    //       .put('/arquivo-tipo')
    //       .auth(accessToken.access_token, { type: 'bearer' })
    //       .send(arquivoTipoAtualizarDto)
    //       .expect(HttpStatus.OK)
    //       .expect(response => {
    //         expect(response.body.id).toBe(arquivoTipoCriado.id)
    //         expect(response.body.nome).toBe(arquivoTipoAtualizarDto.nome)
    //       })
    // })
    //
    // it('/arquivo-tipo (DELETE) - deveria apagar um tipo de arquivo', async () => {
    //   const accessToken = await criarUsuarioParaTeste(app)
    //
    //   const arquivoTipoCriarDto: ArquivoTipoCriarDto = {
    //     nome: faker.word.verb()
    //   }
    //
    //   const responseArquivoTipoCriar = await request(app.getHttpServer())
    //       .post('/arquivo-tipo')
    //       .auth(accessToken.access_token, { type: 'bearer' })
    //       .send(arquivoTipoCriarDto)
    //       .expect(HttpStatus.CREATED)
    //
    //   const arquivoTipoCriado: ArquivoTipoEntity = responseArquivoTipoCriar.body as ArquivoTipoEntity
    //   const queryParams = { id: arquivoTipoCriado.id }
    //
    //   return request(app.getHttpServer())
    //       .delete('/arquivo-tipo')
    //       .auth(accessToken.access_token, { type: 'bearer' })
    //       .query(queryParams)
    //       .expect(HttpStatus.NO_CONTENT)
    // })
});