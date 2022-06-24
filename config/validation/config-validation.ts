import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  //App
  PORT: Joi.number().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().min(16).required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().min(1).required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().min(16).required(),
  //Redis
  REDIS_HOST: Joi.string().min(1).required(),
  REDIS_PORT: Joi.number().required(),
  //Database
  DB_TYPE: Joi.string().min(1).required(),
  DB_HOST: Joi.string().min(1).required(),
  DB_USERNAME: Joi.string().min(1).required(),
  DB_PASSWORD: Joi.string().min(1).required(),
  DB_DATABASE: Joi.string().min(1).required(),
  DB_PORT: Joi.number().required(),
  //AWS
  AWS_ACCESS_KEY_ID: Joi.string().min(1).required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().min(1).required(),
  AWS_BUCKET: Joi.string().min(1).required(),
  AWS_REGION: Joi.string().min(1).required(),
});
