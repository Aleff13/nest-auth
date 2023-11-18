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
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersList, UsersService } from './users.service';
import { AuthExceptionFilter } from '../commom/filters/auth-exception.filter';
import { RolesGuard } from '../commom/guards/roles.guard';
import { Roles } from '../commom/decorators/roles.decorator';
import { RolesEnum } from './enum/role.enum';
import { UsersSearchService } from './users.search.service';
import { UsersSearchTransformer } from './users.search.transformer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersSearchService: UsersSearchService,
    private readonly usersSearchTransformer: UsersSearchTransformer,
  ) {}

  @Get('create')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Render('users/create')
  createUser() {
    //
  }

  @Get('list')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.EMPLOYER)
  @Render('users/list')
  async findAll(): Promise<IUsersList> {
    return {
      users: await this.usersService.findAll(),
    };
  }

  @Post()
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.EMPLOYER)
  @Redirect('users/list')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.EMPLOYER)
  @Get('/search')
  @Render('users/search')
  public async search(
    @Query('parameter') parameter: string,
    @Query('value') value: string,
  ): Promise<any> {
    if (!parameter || !value) return;
    const query = { [parameter]: value };

    const result = await this.usersSearchService.search(query);
    const users = await this.usersSearchTransformer.elasticResultToUser(result);

    return {
      users,
    };
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
