import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BookRepository } from 'src/app/book/book.repository';

@Injectable()
export class TitleAlreadyExistsGuard implements CanActivate {
  constructor(
    @Inject(BookRepository) private readonly bookRepository: BookRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { title } = context.switchToHttp().getRequest().body;

    const user = await this.bookRepository.findByTitle(title);

    if (user) {
      throw new ConflictException(`Book ${title} already exists`);
    }

    return !user;
  }
}
