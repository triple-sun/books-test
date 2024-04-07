import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { IUser } from '../user.interface';
import { Example } from 'src/common/enums/example.enum';

export class CreateUserDto
  implements Pick<IUser, 'email' | 'name' | 'password'>
{
  @Expose()
  @IsEmail({}, { message: 'Invalid email.' })
  @ApiProperty({
    description: 'User email',
    example: Example.Email,
    required: true,
    type: String,
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'User name',
    example: Example.Name,
    required: true,
    type: String,
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: 'User password',
    example: Example.Password,
    required: true,
    type: String,
  })
  public password: string;
}
