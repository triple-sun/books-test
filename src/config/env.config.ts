import { Expose } from 'class-transformer';
import { ValidateIf } from 'class-validator';
import {
  ValidateENVPort,
  ValidateENVProp,
} from 'src/common/decorators/validate-env.decorator';

export class APIEnvConfig {
  @Expose()
  @ValidateIf(({ obj }) => !{ ...obj }.DATABASE_URL)
  @ValidateENVPort()
  public API_PORT!: number;
}

export class PrismaEnvConfig {
  @ValidateENVProp()
  public PRISMA_DB!: string;

  @ValidateENVProp()
  public PRISMA_HOST!: string;

  @ValidateENVProp()
  public PRISMA_USER!: string;

  @ValidateENVProp()
  public PRISMA_PASS!: string;

  @ValidateENVProp()
  public DATABASE_URL!: string;
}

export class JWTEnvConfig {
  @ValidateENVProp()
  public JWT_SECRET!: string;
}

export type TEnvConfig = APIEnvConfig | PrismaEnvConfig | JWTEnvConfig;
