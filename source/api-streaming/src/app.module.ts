import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './modulos/categoria/categoria.module';
import { CategoriaEntity } from './modulos/categoria/entidades/categoria.entity';
import { ClassificacaoIndicativaModule } from './modulos/classificacao-indicativa/classificacao-indicativa.module';
import { ClassificacaoIndicativaEntity } from './modulos/classificacao-indicativa/entidades/classificacao-indicativa.entity';
import { ArquivoTipoModule } from './modulos/arquivo-tipo/arquivo-tipo.module';
import { ArquivoTipoEntity } from './modulos/arquivo-tipo/entidades/arquivo-tipo.entity';
import { ArquivoModule } from './modulos/arquivo/arquivo.module';
import { ArquivoEntity } from './modulos/arquivo/entidades/arquivo.entity';
import { ArquivoResolucaoModule } from './modulos/arquivo-resolucao/arquivo-resolucao.module';
import { ArquivoResolucaoEntity } from './modulos/arquivo-resolucao/entidades/arquivo-resolucao.entity';
import { ConteudoTipoModule } from './modulos/conteudo-tipo/conteudo-tipo.module';
import { ConteudoTipoEntity } from './modulos/conteudo-tipo/entidades/conteudo-tipo.entity';

@Module({
    imports: [
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
                ConteudoTipoEntity
            ],
            synchronize: true,
            logging: false
        }),
        CategoriaModule,
        ClassificacaoIndicativaModule,
        ArquivoTipoModule,
        ArquivoModule,
        ArquivoResolucaoModule,
        ConteudoTipoModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
