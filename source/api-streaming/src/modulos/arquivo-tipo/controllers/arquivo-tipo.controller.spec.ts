import { Test, TestingModule } from '@nestjs/testing';
import { ArquivoTipoController } from './arquivo-tipo.controller';

describe('ArquivoTipoController', () => {
  let controller: ArquivoTipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArquivoTipoController],
    }).compile();

    controller = module.get<ArquivoTipoController>(ArquivoTipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
