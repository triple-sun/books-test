import { IsBoolean, IsEmail, IsInt, IsJWT, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { BookRdo } from 'src/app/book/rdo/book.rdo';
import { Example } from 'src/common/enums/example.enum';

export class UserRdo extends IntersectionType(
  PickType(CreateUserDto, ['name', 'email'] as const),
) {
  @Expose()
  @IsInt()
  @ApiProperty({
    description: 'User ID',
    example: Example.Id,
    required: true,
    nullable: true,
    type: Number,
  })
  public id: number;

  @Expose()
  @IsBoolean()
  @ApiProperty({
    description: 'Books added by user',
    type: [BookRdo],
  })
  public books: BookRdo[];
}

export class UserLoggedRdo extends PickType(UserRdo, ['id'] as const) {
  @Expose()
  @IsJWT()
  @ApiProperty({
    description: 'User bearer authorization token',
    type: String,
  })
  public token: string;
}
