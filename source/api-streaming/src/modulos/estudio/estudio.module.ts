import { Module } from '@nestjs/common';
import { EstudioController } from './controllers/estudio.controller';
import { EstudioService } from './servicos/estudio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudioEntity } from './entidades/estudio.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EstudioController],
  providers: [EstudioService, JwtService],
  imports: [TypeOrmModule.forFeature([EstudioEntity])],
  exports: [TypeOrmModule],
})
export class EstudioModule {}
