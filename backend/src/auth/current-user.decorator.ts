import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

const getCurrentUserContext = (context: ExecutionContext): User | null => {
  console.log('context', context);

  if (context.getType() === 'http') {
    return (context.switchToHttp().getRequest().user as User) || null;
  } else if (context.getType<GqlContextType>() === 'graphql') {
    console.log(
      'GqlExecutionContext.create(context).getContext().req.user',
      GqlExecutionContext.create(context).getContext().req.user,
    );
    return GqlExecutionContext.create(context).getContext().req.user;
  }

  return null;
};

export const CurrentUser = createParamDecorator(
  (_data, context: ExecutionContext) => getCurrentUserContext(context),
);
