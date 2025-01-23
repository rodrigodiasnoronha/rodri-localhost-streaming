import { Test, TestingModule } from '@nestjs/testing';
import { ClassificacaoIndicativaController } from './classificacao-indicativa.controller';

describe('ClassificacaoIndicativaController', () => {
  let controller: ClassificacaoIndicativaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassificacaoIndicativaController],
    }).compile();

    controller = module.get<ClassificacaoIndicativaController>(ClassificacaoIndicativaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
