import { PickType } from '@nestjs/swagger';
import { BookRdo } from '../rdo/book.rdo';

export class BookIdDto extends PickType(BookRdo, ['id'] as const) {}
