import { Test, TestingModule } from '@nestjs/testing';
import { KofisService } from './kofis.service';

describe('KofisService', () => {
  let service: KofisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KofisService],
    }).compile();

    service = module.get<KofisService>(KofisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
