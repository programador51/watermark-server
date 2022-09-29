import { Test, TestingModule } from '@nestjs/testing';
import { KofisController } from './kofis.controller';
import { KofisService } from './kofis.service';

describe('KofisController', () => {
  let controller: KofisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KofisController],
      providers: [KofisService],
    }).compile();

    controller = module.get<KofisController>(KofisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
