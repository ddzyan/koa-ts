import { Context, Next } from "koa";
import { Container } from "typedi";

import UserService from "../services/user";
import { Controller } from "../decorator/Controller";
import { GET } from "../decorator/Method";

@Controller("/user")
class CatsController {
  @GET("/")
  async findAll(ctx: Context, next: Next): Promise<void> {
    console.log("2");
    const userService = Container.get(UserService);
    const userList = await userService.getAll();
    ctx.body = userList;
    console.log("3");
  }

  @GET("/:id")
  findOne(ctx: Context, next: Next): void {
    ctx.body = "This action returns a specified cat";
  }
}

export default CatsController;
