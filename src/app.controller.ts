import {
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './commom/guards/login.guard';
import { Request } from 'express';
import { AuthExceptionFilter } from './commom/filters/auth-exception.filter';
import { GetUser } from './commom/decorators/get-user.decorator';
import { User } from './users/entities/user.entity';
import { RolesGuard } from './commom/guards/roles.guard';
import { Roles } from './commom/decorators/roles.decorator';
import { RolesEnum } from './users/enum/role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('login')
  doRedirect() {
    //
  }

  @Get('password-reset')
  @Render('password-reset')
  doPasswordReset() {
    //
  }

  @Get('confirm')
  @Render('confirm-password')
  async doRecoverPassword(@Req() req: Request, @Query('token') token: string) {
    return {
      token,
    };
  }

  @Get('login')
  @Render('login')
  getIndexLogin(@Req() req: Request) {
    return {
      message: req.flash('loginError'),
      username: req.flash('username'),
      class: req.flash('is-invalid'),
    };
  }

  @Get('home')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.CUSTOMER, RolesEnum.ADMIN, RolesEnum.EMPLOYER)
  @Render('home')
  home(@GetUser() user: User) {
    return {
      name: user.name,
      email: user.email,
    };
  }

  @Post('login')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(LoginGuard)
  @Redirect('/home')
  doLogin() {
    //
  }

  @UseFilters(AuthExceptionFilter)
  @Post('logout')
  @Redirect('/login')
  doLogout(@Req() req: Request) {
    req.session.destroy(null);
  }
}
