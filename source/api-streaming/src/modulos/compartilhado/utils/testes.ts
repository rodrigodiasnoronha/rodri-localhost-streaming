import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UsuarioCriarDto } from '../../usuario/dtos/usuario.dto';
import { faker } from '@faker-js/faker';
import { AuthTokenDto } from '../../auth/dtos/auth.dto';

export const criarUsuarioParaTeste = async (app: INestApplication, usuario?: UsuarioCriarDto): Promise<AuthTokenDto> => {
    const usuarioCriarDto: UsuarioCriarDto = {
        nome: faker.person.fullName(),
        usuario: faker.internet.username(),
        email: faker.internet.email(),
        senha: faker.internet.password(),
    };

    const response = await request(app.getHttpServer())
        .post('/auth/cadastro')
        .send({ ...usuarioCriarDto, ...usuario })
        .expect(HttpStatus.CREATED)
        .expect(response => {
            expect(response.body.access_token).toBeDefined();
        });

    return response.body as AuthTokenDto;
};
