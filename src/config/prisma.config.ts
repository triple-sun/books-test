import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';
import { IntersectionType } from '@nestjs/swagger';
import { APIEnvConfig, PrismaEnvConfig } from './env.config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const prismaEnvSchema = {
  PRISMA_DB: Joi.string().required(),
  PRISMA_HOST: Joi.string().hostname().required(),
  PRISMA_USER: Joi.string().required(),
  PRISMA_PASS: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
};

export const validateEnv =
  <T extends typeof APIEnvConfig>(envConfig: T) =>
  (config: Record<string, unknown>) => {
    const cfg = plainToInstance(envConfig, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(cfg, { skipMissingProperties: false });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return cfg;
  };

export const prismaOptions = registerAs('prisma', () => ({
  port: process.env.PRISMA_PORT,
  host: process.env.PRISMA_HOST,
  user: process.env.PRISMA_USER,
  pass: process.env.PRISMA_PASS,
  DB: process.env.PRISMA_DB,
}));

export const prismaConfig = {
  load: [prismaOptions],
  validate: validateEnv(IntersectionType(APIEnvConfig, PrismaEnvConfig)),
  validationSchema: prismaEnvSchema,
  expandVariables: true,
};
