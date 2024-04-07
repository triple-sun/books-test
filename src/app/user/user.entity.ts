import { genSalt, hash, compare } from 'bcrypt';
import { IUser } from './user.interface';
import { IEntity } from 'src/common/interfaces/entity.interface';
import { SALT_ROUNDS } from 'src/common/const/const';

export class UserEntity implements IEntity<IUser> {
  public userId?: number;
  public email: string;
  public name: string;
  public password: string;
  public passwordHash: string;

  constructor(user: IUser) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: IUser) {
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
  }
}
