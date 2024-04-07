/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module.js';
import { SwaggerModule } from '@nestjs/swagger';
import { Path } from './common/enums/utils.enum.js';
import { Prefix } from './common/enums/prefix.enum.js';
import { CreateUserDto } from './app/user/dto/create-user.dto.js';
import { getSwaggerConfig } from './common/utils/utils.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = Prefix.Global;
  const port = process.env.API_PORT;

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      skipMissingProperties: true,
      transformOptions: {
        enableImplicitConversion: true,
        exposeDefaultValues: true,
      },
    }),
  );
  const document = SwaggerModule.createDocument(
    app,
    getSwaggerConfig('Books API', `Books service API`, '1.0'),
    {
      extraModels: [CreateUserDto],
    },
  );
  SwaggerModule.setup(Path.Spec, app, document);

  await app.startAllMicroservices();

  await app.listen(port);

  Logger.log(
    `🚀 books-test is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
