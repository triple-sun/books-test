import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookRdo } from './rdo/book.rdo';
import { BookRepository } from './book.repository';
import { BookEntity } from './book.entity';
import { fillObject } from 'src/common/utils/utils';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookQueryDto } from './dto/book.query.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async create(dto: CreateBookDto, userId: number) {
    const review = await this.bookRepository.create(
      new BookEntity({
        ...dto,
        userId,
      }),
    );

    return fillObject(BookRdo, review);
  }

  async findAll(dto: BookQueryDto) {
    const reviews = await this.bookRepository.findMany(dto);

    return reviews.map((review) => fillObject(BookRdo, review));
  }

  async findOne(id: number) {
    const order = await this.bookRepository.findOne(id);

    return fillObject(BookRdo, order);
  }

  async update(id: number, dto: UpdateBookDto) {
    const book = await this.bookRepository.findOne(id);

    const update = await this.bookRepository.update(
      id,
      new BookEntity({
        ...book,
        ...dto,
      }),
    );

    return fillObject(BookRdo, update);
  }

  async remove(id: number) {
    const book = await this.bookRepository.findOne(id);

    await this.bookRepository.destroy(id);

    return `Book '${book.title}'(id: ${book.id}) was removed`;
  }
}
