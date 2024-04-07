import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ICRUD } from 'src/common/interfaces/CRUD.interface';
import { BookEntity } from './book.entity';
import { IBook } from './book.interface';
import { BookQueryDto } from './dto/book.query.dto';
import { BOOKS_PER_PAGE } from 'src/common/const/const';

@Injectable()
export class BookRepository implements ICRUD<BookEntity, number, IBook> {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(item: BookEntity) {
    const { userId, ...book } = item.toObject();

    return await this.prismaService.book.create({
      data: {
        ...book,
        user: { connect: { id: userId } },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public async findMany({ page, author, year }: BookQueryDto) {
    return await this.prismaService.book.findMany({
      where: { author: author, year: year },
      take: BOOKS_PER_PAGE,
      skip: page > 0 ? BOOKS_PER_PAGE * (page - 1) : undefined,
      include: { user: true },
    });
  }

  public async findOne(id: number): Promise<IBook | null> {
    return await this.prismaService.book.findUnique({
      where: { id },
    });
  }

  public async findByTitle(title: string): Promise<IBook | null> {
    return await this.prismaService.book.findUnique({
      where: { title },
    });
  }

  public async update(id: number, data: BookEntity) {
    return await this.prismaService.book.update({
      where: { id },
      data,
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prismaService.book.delete({ where: { id } });
  }
}
