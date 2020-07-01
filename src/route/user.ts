import Router from 'koa-router';

import UserController from '../controller/userController';

const UserRouter: Router = new Router({
  prefix: '/user',
});

UserRouter.get(
  '/id',
  async (ctx, next): Promise<void> => {
    ctx.body = await UserController.getUserById(1);
  }
);

export default UserRouter;
