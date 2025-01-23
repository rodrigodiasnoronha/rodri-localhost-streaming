import * as path from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './modulos/categoria/categoria.module';
import { CategoriaEntity } from './modulos/categoria/categoria.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: String(process.env.DB_HOST),
            port: Number(process.env.DB_PORT),
            username: String(process.env.DB_USERNAME),
            password: String(process.env.DB_PASSWORD),
            database: String(process.env.DB_NAME),
            entities: [CategoriaEntity],
            synchronize: true,
        }),
        CategoriaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
