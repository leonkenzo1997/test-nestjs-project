import {
  Body, Controller, Delete, Get, Param, Post, Put,
  Query
} from '@nestjs/common';
import { AuthRoles } from '../auth/decorators/role.decorator';
import { UserRole } from '../users/entities/user.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @AuthRoles(UserRole.Admin)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @AuthRoles(UserRole.Admin)
  @Get()
  findAll(@Query('keyword') keyword?: string) {
    return this.categoriesService.findAll(keyword);
  }

  @AuthRoles(UserRole.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @AuthRoles(UserRole.Admin)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @AuthRoles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
