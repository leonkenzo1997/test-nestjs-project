import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationDto } from 'src/utils/dto/pagination.dto';
import { KeywordDto } from './../../../utils/dto/pagination.dto';

export class GetIngredientDto extends IntersectionType(PaginationDto, KeywordDto) {
}
