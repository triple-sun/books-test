import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from 'src/config/jwt.config';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule.registerAsync(getJWTConfig())],
  providers: [UserRepository, UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
