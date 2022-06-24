import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_BUCKET,
  region: process.env.AWS_REGION,
}));
