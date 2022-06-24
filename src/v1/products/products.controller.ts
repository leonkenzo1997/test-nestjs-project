import { Paginate } from 'nestjs-paginate';
import { AuthRoles } from './../auth/decorators/role.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { UserRole } from '../users/entities/user.entity';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @AuthRoles(UserRole.Admin)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    console.log(createProductDto, req.user);
    return this.productsService.create(createProductDto, req.user);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @AuthRoles(UserRole.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @AuthRoles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
