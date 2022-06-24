import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { File, FileStatus } from './entities/file.entity';
import { ResponseService } from 'src/utils/response.service';
import { v4 as uuid } from 'uuid';
import { S3Service } from '../s3/s3.service';
import { ErrorResponse } from './exceptions/exceptions.response';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private s3Service: S3Service,
    private res: ResponseService,
  ) {}

  async uploadFile(file, user) {
    //generate and check unique UUID
    let key: string;
    do {
      key = uuid();
      const existedFile = await this.filesRepository.findOne({
        where: { key },
      });
      if (!existedFile) break;
    } while (true);
    //Upload S3
    const url = await this.s3Service.uploadFile(file, key, false);
    //create file row
    const { originalname, mimetype } = file;

    const fileInfo = this.filesRepository.create({
      key,
      url,
      fileName: originalname,
      mimeType: mimetype,
      createdBy: user,
    });

    const result = await this.filesRepository.save(fileInfo);
    //return file
    return this.res.success(result);
  }

  async checkPendingImageByUser(fileId: number, userId: number) {
    const file = await this.filesRepository.findOne({
      where: {
        id: fileId,
        createdBy: { id: userId },
        status: FileStatus.Pending,
        mimeType: In(['image/png', 'image/jpeg','image/gif']),
      },
    });

    if (!file) {
      throw new BadRequestException(ErrorResponse.fileNotFound);
    }
  }

  async checkPendingPdfByUser(fileId: number, userId: number) {
    const file = await this.filesRepository.findOne({
      where: {
        id: fileId,
        createdBy: { id: userId },
        status: FileStatus.Pending,
        mimeType: 'application/pdf'
      },
    });

    if (!file) {
      throw new BadRequestException(ErrorResponse.fileNotFound);
    }
  }

  async activateFileByUser(fileId: number, userId: number) {
    const result = await this.filesRepository.update(
      { id: fileId, createdBy: { id: userId }, status: FileStatus.Pending },
      { status: FileStatus.Active },
    );
    if (result.affected != 1) {
      throw new InternalServerErrorException(ErrorResponse.cannotActivateFile);
    }
  }
}
