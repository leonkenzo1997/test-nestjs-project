import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @Post()
  //  create(@Body() createRoleDto: CreateRoleDto) {
  //   return this.rolesService.create(createRoleDto);
  // }

  // @Get(':id')
  //  async findOne(@Param('id') id: number) {
  //   return await this.rolesService.findOne({ id }, { relations: ['rules'] });
  // }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(id, updateRoleDto);
  // }
}
