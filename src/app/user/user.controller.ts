import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prefix } from 'src/common/enums/prefix.enum';
import { UserService } from './user.service';
import { UserLoggedRdo, UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailAlreadyExistsGuard } from 'src/common/guards/email-already-exists.guard';
import { Path } from 'src/common/enums/utils.enum';
import { UserExistsGuard } from 'src/common/guards/user-exists.guard';
import { UserLoginGuard } from 'src/common/guards/login.guard';
import { LoginUserDTO } from './dto/login-user.dto';

@ApiTags(Prefix.Users)
@Controller(Prefix.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(Path.Register)
  @UseGuards(EmailAlreadyExistsGuard)
  @ApiBody({ type: CreateUserDto, description: 'User registration data' })
  @ApiOkResponse({
    description: 'User created successfully',
    type: UserRdo,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  registerUser(@Body() dto: CreateUserDto) {
    return this.userService.registerUser(dto);
  }

  @Post(Path.Login)
  @UseGuards(UserExistsGuard, UserLoginGuard)
  @ApiBody({ type: LoginUserDTO, description: 'User login credentials' })
  @ApiOkResponse({
    type: UserLoggedRdo,
    description: 'User logged in successfully',
  })
  loginUser(@Body() dto: LoginUserDTO) {
    return this.userService.loginUser(dto);
  }
}
