import { Context, Next } from "koa";
import { Container } from "typedi";
import UserService from "../services/user";
import { Controller } from "../decorator/Controller";
import { GET } from "../decorator/Method";

@Controller("/user")
class CatsController {
  @GET("/")
  async findAll(ctx: Context, next: Next): Promise<void> {
    const userService = Container.get(UserService);
    const userList = await userService.getAll();
    ctx.body = userList;
  }

  @GET("/:id")
  async findOne(ctx: Context, next: Next) {
    const { id } = ctx.request.params;
    const userService = Container.get(UserService);
    const userInfo = await userService.getUserById(Number.parseInt(id));
    ctx.body = userInfo || {};
  }
}

export default CatsController;
