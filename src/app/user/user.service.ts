import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import { UserLoggedRdo, UserRdo } from './rdo/user.rdo';
import { fillObject } from 'src/common/utils/utils';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(id: number) {
    const user = await this.userRepository.findOne(id);

    return fillObject(UserRdo, user);
  }

  async findAll() {
    const users = await this.userRepository.findAll();

    return users.map((user) => fillObject(UserRdo, user));
  }

  async registerUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(
      await new UserEntity(dto).setPassword(dto.password),
    );

    return fillObject(UserRdo, user);
  }

  async loginUser({ email }: LoginUserDTO) {
    const { id, name } = await this.userRepository.findByEmail(email);
    const token = await this.jwtService.signAsync({
      id,
      name,
      email,
    });

    return fillObject(UserLoggedRdo, { id, name, email, token });
  }
}
