import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Redirect,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersList, UsersService } from './users.service';
import { AuthenticatedGuard } from '../commom/guards/authenticated.guard';
import { AuthExceptionFilter } from '../commom/filters/auth-exception.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('create')
  @Render('users/create')
  createUser() {
    //
  }

  @Get('list')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(AuthenticatedGuard)
  @Render('users/list')
  async findAll(): Promise<IUsersList> {
    return {
      users: await this.usersService.findAll(),
    };
  }

  @Post()
  @Redirect('users/list')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
