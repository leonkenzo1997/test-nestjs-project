import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { ResponseService } from 'src/utils/response.service';
import { Like, Repository } from 'typeorm';
import { PaginateService } from './../../utils/paginate.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { GetIngredientDto } from './dto/get-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { ErrorResponse } from './exceptions/exceptions.response';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    private res: ResponseService,
    private paginate: PaginateService,
  ) {}
  async create(createCategoryDto: CreateIngredientDto) {
    const category = this.ingredientRepository.create({ ...createCategoryDto });
    const result = await category.save();
    return this.res.success(result);
  }

  async findAll(getIngredientDto: GetIngredientDto) {
    const page = getIngredientDto.page ? getIngredientDto.page : 1;
    const limit = getIngredientDto.limit;
    const order = getIngredientDto.order;
    const keyword = getIngredientDto.keyword;
    const skip = (page - 1) * limit;
    let conditions = {};
    conditions['status'] = true;

    if (getIngredientDto.keyword) {
      conditions['name'] = Like(`%${keyword}%`);
    }
    const [ingredients, total] = await this.ingredientRepository.findAndCount({
      where: conditions,
      order: { createdAt: order },
      take: limit,
      skip: skip,
    });
    const result = this.paginate.create(ingredients, total, page, limit);
    return this.res.success(result);
  }

  async findOne(id: number) {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id },
    });
    if (!ingredient) {
      throw new BadRequestException(ErrorResponse.NotFound);
    }
    return this.res.success(ingredient);
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id },
    });
    if (!ingredient) {
      throw new BadRequestException(ErrorResponse.NotFound);
    }

    await this.ingredientRepository.update(id, updateIngredientDto);
    const result = await this.ingredientRepository.findOne({ where: { id } });
    return this.res.success(result);
  }

  async remove(id: number) {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id, status: true },
    });
    if (!ingredient) {
      throw new BadRequestException(ErrorResponse.NotFound);
    }
    const data = instanceToPlain(ingredient);
    data.status = 0;
    const result = await this.ingredientRepository.update(id, data);
    return this.res.success(result);
  }
}
