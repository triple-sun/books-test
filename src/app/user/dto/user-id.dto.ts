import { PickType } from '@nestjs/swagger';
import { UserRdo } from '../rdo/user.rdo';

export class UserIdDto extends PickType(UserRdo, ['id']) {}
