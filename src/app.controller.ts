import {
  Controller,
  Get,
  Post,
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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  @Render('login')
  getIndexLogin(@Req() req: Request) {
    return {
      message: req.flash('loginError'),
      username: req.flash('username'),
      class: req.flash('is-invalid'),
    };
  }

  @Post('login')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(LoginGuard)
  @Redirect('users/list')
  doLogin() {
    //
  }

  @Get()
  @Redirect('login')
  doRedirect() {
    //
  }
}
