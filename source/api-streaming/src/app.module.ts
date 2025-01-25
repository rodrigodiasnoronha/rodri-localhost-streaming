import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './modulos/categoria/categoria.module';
import { CategoriaEntity } from './modulos/categoria/entidades/categoria.entity';
import { ClassificacaoIndicativaModule } from './modulos/classificacao-indicativa/classificacao-indicativa.module';
import {
    ClassificacaoIndicativaEntity,
} from './modulos/classificacao-indicativa/entidades/classificacao-indicativa.entity';
import { ArquivoTipoModule } from './modulos/arquivo-tipo/arquivo-tipo.module';
import { ArquivoTipoEntity } from './modulos/arquivo-tipo/entidades/arquivo-tipo.entity';
import { ArquivoModule } from './modulos/arquivo/arquivo.module';
import { ArquivoEntity } from './modulos/arquivo/entidades/arquivo.entity';
import { ArquivoResolucaoModule } from './modulos/arquivo-resolucao/arquivo-resolucao.module';
import { ArquivoResolucaoEntity } from './modulos/arquivo-resolucao/entidades/arquivo-resolucao.entity';
import { ConteudoTipoModule } from './modulos/conteudo-tipo/conteudo-tipo.module';
import { ConteudoTipoEntity } from './modulos/conteudo-tipo/entidades/conteudo-tipo.entity';
import { AuthModule } from './modulos/auth/auth.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { UsuarioEntity } from './modulos/usuario/entidades/usuario.entity';
import { EstudioModule } from './modulos/estudio/estudio.module';
import { EstudioEntity } from './modulos/estudio/entidades/estudio.entity';
import { ConteudoModule } from './modulos/conteudo/conteudo.module';
import { ConteudoEntity } from './modulos/conteudo/entidades/conteudo.entity';
import * as process from 'process';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: String(process.env.DB_HOST),
            port: Number(process.env.DB_PORT),
            username: String(process.env.DB_USERNAME),
            password: String(process.env.DB_PASSWORD),
            database: String(process.env.DB_NAME),
            entities: [
                CategoriaEntity,
                ClassificacaoIndicativaEntity,
                ArquivoEntity,
                ArquivoTipoEntity,
                ArquivoResolucaoEntity,
                ConteudoTipoEntity,
                UsuarioEntity,
                EstudioEntity,
                ConteudoEntity
            ],
            synchronize: String(process.env.ENVIRONMENT) == 'development',
            logging: false,
        }),
        CategoriaModule,
        ClassificacaoIndicativaModule,
        ArquivoTipoModule,
        ArquivoModule,
        ArquivoResolucaoModule,
        ConteudoTipoModule,
        AuthModule,
        UsuarioModule,
        EstudioModule,
        ConteudoModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
