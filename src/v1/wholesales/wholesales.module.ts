import { Module } from '@nestjs/common';
import { WholesalesService } from './wholesales.service';
import { WholesalesController } from './wholesales.controller';

@Module({
  controllers: [WholesalesController],
  providers: [WholesalesService]
})
export class WholesalesModule {}
