import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRepository } from 'typeorm';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});