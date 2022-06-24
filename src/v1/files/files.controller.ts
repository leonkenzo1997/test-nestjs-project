import {
  Controller,
  Post,
  Body,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthRoles } from '../auth/decorators/role.decorator';
import { UserRole } from '../users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerUploadImageOptions, multerPdfOptions } from './config/multer.config';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @AuthRoles(UserRole.Admin)
  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerUploadImageOptions))
  uploadImage(@UploadedFile() file, @Request() req) {
    return this.filesService.uploadFile(file, req.user);
  }

  @AuthRoles(UserRole.Admin)
  @Post('pdf')
  @UseInterceptors(FileInterceptor('file', multerPdfOptions))
  uploadPdf(@UploadedFile() file, @Request() req) {
    return this.filesService.uploadFile(file, req.user);
  }
}
