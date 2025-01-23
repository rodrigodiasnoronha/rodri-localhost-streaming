import { Test, TestingModule } from '@nestjs/testing';
import { ClassificacaoIndicativaService } from './classificacao-indicativa.service';

describe('ClassificacaoIndicativaService', () => {
  let service: ClassificacaoIndicativaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassificacaoIndicativaService],
    }).compile();

    service = module.get<ClassificacaoIndicativaService>(ClassificacaoIndicativaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
