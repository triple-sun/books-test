import { IEntity } from 'src/common/interfaces/entity.interface';
import { IBook } from './book.interface';

export class BookEntity implements IEntity<IBook> {
  public title: string;
  public author: string;
  public desc: string;
  public year: number;
  public userId: number;

  constructor(review: IBook) {
    this.fillEntity(review);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(book: IBook) {
    this.title = book.title;
    this.author = book.author;
    this.desc = book.desc;
    this.year = book.year;
    this.userId = book.userId;
  }
}
