import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationArguments } from 'class-validator';
import { DocumentBuilder } from '@nestjs/swagger';

export const fillObject = <T, V>(dto: ClassConstructor<T>, obj: V) =>
  plainToInstance(dto, obj, { excludeExtraneousValues: true });

export const getENVErrorMessage = ({
  value,
  targetName,
  property,
}: ValidationArguments) =>
  `${targetName} ${property
    .toLowerCase()
    .replace(/_/g, ' ')} is required. Current value: ${value}`;

export const getSwaggerConfig = (
  title: string,
  desc: string,
  version: string,
) =>
  new DocumentBuilder()
    .setTitle(title)
    .setDescription(desc)
    .setVersion(version)
    .addBearerAuth()
    .build();
