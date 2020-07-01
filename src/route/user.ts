import Router from 'koa-router';

import UserController from '../controller/user.controller';
import { CreateUser } from '../interface/user.interface';

const userRouter: Router = new Router({
  prefix: '/user',
});

userRouter.get(
  '/:id',
  async (ctx, next): Promise<void> => {
    const { id } = ctx.params;
    ctx.body = await UserController.getUserById(Number.parseInt(id));
  }
);

userRouter.post(
  '/',
  async (ctx, next): Promise<void> => {
    const user: CreateUser = ctx.request.body;
    ctx.body = await UserController.createUser(user);
  }
);

export default userRouter;
