import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Prefix } from 'src/common/enums/prefix.enum';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookRdo } from './rdo/book.rdo';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { BookExistsGuard } from 'src/common/guards/book-exists.guard';
import { UserIdDto } from '../user/dto/user-id.dto';
import { BookUserGuard } from 'src/common/guards/book-user.guard';
import { BookQueryDto } from './dto/book.query.dto';
import { TitleAlreadyExistsGuard } from 'src/common/guards/title-already-exists.guard';
import { Example } from 'src/common/enums/example.enum';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags(Prefix.Books)
@Controller(Prefix.Books)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateBookDto, description: 'Book object' })
  @ApiCreatedResponse({ type: BookRdo, description: 'New book object' })
  @UseGuards(JwtAuthGuard, TitleAlreadyExistsGuard)
  async create(@Body() dto: CreateBookDto, @User() { id }: UserIdDto) {
    return await this.bookService.create(dto, id);
  }

  @Get()
  @ApiQuery({ type: BookQueryDto, description: 'Books index query' })
  @ApiOkResponse({ type: [BookRdo], description: 'Book object array' })
  findAll(@Query() query: BookQueryDto) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: BookRdo, description: 'Book object' })
  @UseGuards(BookExistsGuard)
  async findOne(@Param('id') id: number) {
    return await this.bookService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateBookDto, description: 'Book update dto' })
  @ApiParam({
    name: 'id',
    description: 'Book ID',
    type: Number,
    example: Example.Id,
  })
  @ApiOkResponse({ type: BookRdo, description: 'Updated book object' })
  @UseGuards(JwtAuthGuard, BookExistsGuard, BookUserGuard)
  async update(@Param('id') id: number, @Body() dto: UpdateBookDto) {
    return await this.bookService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Book ID',
    type: Number,
    example: Example.Id,
  })
  @ApiOkResponse({ type: String, description: 'Book removal info message' })
  @UseGuards(JwtAuthGuard, BookExistsGuard, BookUserGuard)
  async remove(@Param('id') id: number) {
    return await this.bookService.remove(id);
  }
}
