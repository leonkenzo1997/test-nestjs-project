import { Test, TestingModule } from '@nestjs/testing';
import { WholesalesController } from './wholesales.controller';
import { WholesalesService } from './wholesales.service';

describe('WholesalesController', () => {
  let controller: WholesalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WholesalesController],
      providers: [WholesalesService],
    }).compile();

    controller = module.get<WholesalesController>(WholesalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
