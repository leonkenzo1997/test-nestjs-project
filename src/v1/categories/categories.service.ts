import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { ResponseService } from 'src/utils/response.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryStatus } from './entities/category.entity';
import { ErrorResponse } from './exceptions/exceptions.response';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private res: ResponseService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create({ ...createCategoryDto });
    const result = await category.save();
    return this.res.success(result);
  }

  async findAll(keyword?: string) {
    const result = await this.categoryRepository.find({
      where: { status: CategoryStatus.Active },
      order: { name: 'ASC' },
    });
    return this.res.success(result);
  }

  // find by keyword
  // async findByName(keyword?:string) {
  //   return await this.categoryRepository.find({where : {status: 1, name: Like('%' + keyword + '%') }, order: {name: 'ASC'}});
  // }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new BadRequestException(ErrorResponse.NotFound);
    }
    return this.res.success(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new BadRequestException(ErrorResponse.NotFound);
    }

    await this.categoryRepository.update(id, updateCategoryDto);
    const result = await this.categoryRepository.findOne({ where: { id } });
    return this.res.success(result);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({where: {id, status: CategoryStatus.Active}});
    if (!category) {
      throw new BadRequestException(ErrorResponse.NotFound);
    }
    const data = instanceToPlain(category);
    data.status = CategoryStatus.Deleted;
    const result = await this.categoryRepository.update(id, data);
    return this.res.success(result);
  }
}
