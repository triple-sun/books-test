import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../../app/user/user.repository';

@Injectable()
export class EmailAlreadyExistsGuard implements CanActivate {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email } = context.switchToHttp().getRequest().body;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    return !user;
  }
}
