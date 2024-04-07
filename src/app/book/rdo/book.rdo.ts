import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt } from 'class-validator';
import { Example } from 'src/common/enums/example.enum';
import { CreateBookDto } from '../dto/create-book.dto';

export class BookRdo extends PickType(CreateBookDto, [
  'author',
  'desc',
  'title',
  'year',
] as const) {
  @Expose()
  @IsInt()
  @ApiProperty({
    description: 'Book id',
    example: Example.Id,
    required: true,
    type: Number,
  })
  public id: number;

  @Expose()
  @ApiProperty({
    description: 'Added by user with this id',
    example: Example.Id,
    type: Number,
  })
  public userId: number;
}
