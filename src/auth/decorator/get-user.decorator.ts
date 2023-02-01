import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// custom user decorator for getting the current logged in user from the execution context
export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );
  