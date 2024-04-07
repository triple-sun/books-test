import { IntersectionType } from '@nestjs/swagger';
import { APIEnvConfig, JWTEnvConfig, PrismaEnvConfig } from '../env.config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';

class EnvConfig extends IntersectionType(
  APIEnvConfig,
  PrismaEnvConfig,
  JWTEnvConfig,
) {}

export const validateEnv =
  <T extends typeof APIEnvConfig>(envConfig: T) =>
  (config: Record<string, unknown>) => {
    const cfg = plainToInstance(envConfig, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(cfg, { skipMissingProperties: false });

    if (errors.length > 0) {
      errors.forEach((e) => {
        throw new InternalServerErrorException(
          `${e.constraints.customValidation ?? e.toString()}`,
        );
      });
    }

    return cfg;
  };

export default validateEnv(EnvConfig);
