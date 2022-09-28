import { Test, TestingModule } from '@nestjs/testing';
import { DetaService } from './deta.service';

describe('DetaService', () => {
  let service: DetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetaService],
    }).compile();

    service = module.get<DetaService>(DetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
