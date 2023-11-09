import {
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './commom/guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  @Render('login')
  getIndexLogin() {
    //
  }

  @Post('login')
  @UseGuards(LoginGuard)
  @Redirect('users/list')
  doLogin() {
    //
  }
}
