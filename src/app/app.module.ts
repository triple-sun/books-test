import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { apiConfig } from '../config/api.config';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot(apiConfig),
    UserModule,
    BookModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
