import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { IBook } from '../book.interface';
import { Example } from 'src/common/enums/example.enum';

export class CreateBookDto implements Omit<IBook, 'userId' | 'id'> {
  @Expose()
  @IsString()
  @ApiProperty({
    description: 'Book title',
    example: Example.Title,
    required: true,
    nullable: false,
    type: String,
  })
  public title: string;

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'Book author',
    example: Example.Author,
    required: true,
    nullable: false,
    type: String,
  })
  public author: string;

  @Expose()
  @IsInt()
  @ApiProperty({
    description: 'Book publication year',
    example: Example.Year,
    required: true,
    nullable: false,
    type: Number,
    minLength: 4,
    maxLength: 4,
  })
  public year: number;

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'Book description',
    example: Example.Desc,
    required: true,
    nullable: false,
    type: String,
  })
  public desc: string;
}
