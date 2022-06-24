import { Injectable } from '@nestjs/common';
import { CreateWholesaleDto } from './dto/create-wholesale.dto';
import { UpdateWholesaleDto } from './dto/update-wholesale.dto';

@Injectable()
export class WholesalesService {
  create(createWholesaleDto: CreateWholesaleDto) {
    return 'This action adds a new wholesale';
  }

  findAll() {
    return `This action returns all wholesales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wholesale`;
  }

  update(id: number, updateWholesaleDto: UpdateWholesaleDto) {
    return `This action updates a #${id} wholesale`;
  }

  remove(id: number) {
    return `This action removes a #${id} wholesale`;
  }
}
