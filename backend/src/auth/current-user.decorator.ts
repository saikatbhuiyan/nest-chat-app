import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

const getCurrentUserContext = (context: ExecutionContext): User | null => {
  if (context.getType() === 'http') {
    return (context.switchToHttp().getRequest().user as User) || null;
  }
  if (context.getType<GqlContextType>() === 'graphql') {
    return (
      (GqlExecutionContext.create(context).getContext().req.user as User) ||
      null
    );
  }
  return null;
};

export const CurrentUser = createParamDecorator(
  (_data, context: ExecutionContext) => getCurrentUserContext(context),
);
