import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {}

  AWS_BUCKET = this.configService.get<string>('aws.bucket');
  AWS_REGION = this.configService.get<string>('aws.region');
  s3 = new AWS.S3({
    accessKeyId: this.configService.get<string>('aws.accessKey'),
    secretAccessKey: this.configService.get<string>('aws.secret'),
  });

  async uploadFile(
    file,
    key: string,
    isPrivate: boolean = false,
  ): Promise<string> {
    await this.s3Upload(
      file.buffer,
      this.AWS_BUCKET,
      key,
      file.mimetype,
      isPrivate,
    );

    return `https://${this.AWS_BUCKET}.s3-${this.AWS_REGION}.amazonaws.com/${key}`;
  }

  async s3Upload(
    file,
    bucket: string,
    key: string,
    mimetype: string,
    isPrivate: boolean,
  ) {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: file,
      ACL: isPrivate ? 'private' : 'public-read',
      ContentType: mimetype,
    };

    try {
      await this.s3.upload(params).promise();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
