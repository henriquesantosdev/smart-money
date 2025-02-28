import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_TOKEN_PAYLOAD_NAME } from '../common/auth.constants';
import { Request } from 'express';

export const TokenPayloadParam = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return request[REQUEST_TOKEN_PAYLOAD_NAME];
  },
);
