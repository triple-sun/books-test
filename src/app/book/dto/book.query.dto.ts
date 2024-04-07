import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Example } from 'src/common/enums/example.enum';

export class BookQueryDto {
  @Expose()
  @IsString()
  @ApiPropertyOptional({
    description: 'Book author',
    example: Example.Author,
    type: String,
  })
  public author?: string;

  @Expose()
  @IsInt()
  @ApiPropertyOptional({
    description: 'Book release year',
    example: Example.Year,
    type: Number,
    minLength: 4,
    maxLength: 4,
  })
  public year?: number;

  @Expose()
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    description: 'Books index page',
    example: Example.Page,
    default: 1,
    type: Number,
  })
  public page?: number = 1;
}
