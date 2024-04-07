import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BookRepository } from 'src/app/book/book.repository';

@Injectable()
export class BookUserGuard implements CanActivate {
  constructor(
    @Inject(BookRepository) private readonly bookRepository: BookRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id } = context.switchToHttp().getRequest().params;
    const { user } = context.switchToHttp().getRequest();

    const book = await this.bookRepository.findOne(parseInt(id));

    if (book.userId != user.id) {
      throw new ForbiddenException(
        `You can only edit or delete books that you've added`,
      );
    }

    return !!user;
  }
}
