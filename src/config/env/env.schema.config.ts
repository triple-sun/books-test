import * as Joi from 'joi';
import { jwtEnvSchema } from '../jwt.config';
import { prismaEnvSchema } from '../prisma.config';
import { apiEnvSchema } from '../api.config';

export default Joi.object({
  ...apiEnvSchema,
  ...prismaEnvSchema,
  ...jwtEnvSchema,
});
