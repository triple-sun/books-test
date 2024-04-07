import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { BookController } from './book.controller';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
