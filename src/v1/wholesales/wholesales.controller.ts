import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WholesalesService } from './wholesales.service';
import { CreateWholesaleDto } from './dto/create-wholesale.dto';
import { UpdateWholesaleDto } from './dto/update-wholesale.dto';

@Controller('wholesales')
export class WholesalesController {
  constructor(private readonly wholesalesService: WholesalesService) {}

  @Post()
  create(@Body() createWholesaleDto: CreateWholesaleDto) {
    return this.wholesalesService.create(createWholesaleDto);
  }

  @Get()
  findAll() {
    return this.wholesalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wholesalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWholesaleDto: UpdateWholesaleDto) {
    return this.wholesalesService.update(+id, updateWholesaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wholesalesService.remove(+id);
  }
}
