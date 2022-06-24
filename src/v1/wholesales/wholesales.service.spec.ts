import { Test, TestingModule } from '@nestjs/testing';
import { WholesalesService } from './wholesales.service';

describe('WholesalesService', () => {
  let service: WholesalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WholesalesService],
    }).compile();

    service = module.get<WholesalesService>(WholesalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
