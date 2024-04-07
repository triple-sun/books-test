import * as Joi from 'joi';

import { appConfig } from './app.config';
import envSchema from './env/env.schema.config';
import envValidation from './env/env.validation.config';
import { jwtOptions } from './jwt.config';
import { prismaOptions } from './prisma.config';

export const apiEnvSchema = {
  API_PORT: Joi.number().port().required(),
};

export const apiConfig = {
  ...appConfig,
  load: [prismaOptions, jwtOptions],
  validate: envValidation,
  validationSchema: envSchema,
};
