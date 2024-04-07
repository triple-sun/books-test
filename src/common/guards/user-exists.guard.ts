import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/app/user/user.repository';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email } = context.switchToHttp().getRequest().body;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(`User with email ${email} was not found`);
    }

    return !!user;
  }
}
