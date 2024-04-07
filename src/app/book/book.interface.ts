import { Book } from '@prisma/client';

export interface IBook extends Omit<Book, 'id'> {
  id?: number;
}
