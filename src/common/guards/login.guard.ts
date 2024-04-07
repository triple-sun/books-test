import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../app/user/user.repository';
import { UserEntity } from 'src/app/user/user.entity';

@Injectable()
export class UserLoginGuard implements CanActivate {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email, password } = context.switchToHttp().getRequest().body;

    const user = await this.userRepository.findByEmail(email);
    const entity = new UserEntity(user);

    if (!(await entity.comparePassword(password))) {
      throw new UnauthorizedException(`Wrong password.`);
    }

    return !!user;
  }
}
