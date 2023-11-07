import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(username);

    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);

    return match === true ? user : null;
  }
}
