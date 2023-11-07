import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './enum/role.enum';

export interface IUser {
  name: string;
  email: string;
  role: string;
}

export interface IUsersList {
  users: IUser[];
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.setUser(
      1,
      createUserDto.email,
      createUserDto.name,
      createUserDto.password,
      createUserDto.role,
    );

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userRepository.find();

    const transformedUsers = users.map((user) => ({
      name: user.name,
      email: user.email,
      role: Object.getOwnPropertyNames(UserRole)[user.role]?.toString(),
    }));

    return transformedUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
