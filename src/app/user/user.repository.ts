import { Injectable } from '@nestjs/common';
import { ICRUD } from '../../common/interfaces/CRUD.interface';
import { UserEntity } from './user.entity';
import { IUser } from './user.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository
  implements ICRUD<UserEntity, number | string, IUser>
{
  constructor(private readonly prismaService: PrismaService) {}

  public async create(item: UserEntity): Promise<IUser> {
    return await this.prismaService.user.create({
      data: item.toObject(),
    });
  }

  public async findAll() {
    return await this.prismaService.user.findMany();
  }

  public async findOne(id: number): Promise<IUser | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  public async update(id: number, data: UserEntity) {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}
