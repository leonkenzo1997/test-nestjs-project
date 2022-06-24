import { GetIngredientDto } from './dto/get-ingredient.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientsService } from './ingredients.service';
import { AuthRoles } from '../auth/decorators/role.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @AuthRoles(UserRole.Admin)
  create(@Body() createIngridient: CreateIngredientDto) {
    return this.ingredientsService.create(createIngridient);
  }

  @Get()
  @AuthRoles(UserRole.Admin)
  findAll(@Query() getIngredientDto : GetIngredientDto) {
    return this.ingredientsService.findAll(getIngredientDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientsService.findOne(+id);
  }

  @Put(':id')
  @AuthRoles(UserRole.Admin)
  update(@Param('id') id: string, @Body() updateIngridientDto: UpdateIngredientDto) {
    return this.ingredientsService.update(+id, updateIngridientDto);
  }

  @Delete(':id')
  @AuthRoles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.ingredientsService.remove(+id);
  }
}
