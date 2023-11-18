import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const isAuthException =
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException;

    const isNotFoundException = exception instanceof NotFoundException;

    if (isAuthException) {
      request.flash('loginError', 'Usuário/senha inválidos');
      request.flash('username', request.body.username);
      request.flash('class', 'is-invalid');
      response.redirect('/login');
    }

    if (isNotFoundException) {
      response.redirect('/404');
    }
  }
}
