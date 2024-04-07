import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from 'src/app/book/book.repository';

@Injectable()
export class BookExistsGuard implements CanActivate {
  constructor(
    @Inject(BookRepository) private readonly bookRepository: BookRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id } = context.switchToHttp().getRequest().params;

    const book = await this.bookRepository.findOne(parseInt(id));

    if (!book) {
      throw new NotFoundException(`Book with id ${id} was not found`);
    }

    return !!book;
  }
}
