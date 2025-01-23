import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './modulos/categoria/categoria.module';
import { CategoriaEntity } from './modulos/categoria/categoria.entity';
import { ClassificacaoIndicativaModule } from './modulos/classificacao-indicativa/classificacao-indicativa.module';
import { ClassificacaoIndicativaEntity } from './modulos/classificacao-indicativa/classificacao-indicativa.entity';

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
                ClassificacaoIndicativaEntity
            ],
            synchronize: true,
        }),
        CategoriaModule,
        ClassificacaoIndicativaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
