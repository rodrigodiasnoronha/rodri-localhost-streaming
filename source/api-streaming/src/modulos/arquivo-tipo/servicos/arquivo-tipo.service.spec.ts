import { Test, TestingModule } from '@nestjs/testing';
import { ArquivoTipoService } from './arquivo-tipo.service';

describe('ArquivoTipoService', () => {
  let service: ArquivoTipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArquivoTipoService],
    }).compile();

    service = module.get<ArquivoTipoService>(ArquivoTipoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
