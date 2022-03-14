import { Context, Next } from "koa";
import { Container } from "typedi";

import CatService from "../services/cat";
import { Controller } from "../decorator/Controller";
import { GET } from "../decorator/Method";

@Controller("/cats")
class CatsController {
  @GET("/all")
  findAll(ctx: Context, next: Next): void {
    const catService = Container.get(CatService);
    ctx.body = catService.getAll();
  }

  @GET("/:id")
  findOne(ctx: Context, next: Next): void {
    ctx.body = "This action returns a specified cat";
  }
}

export default CatsController;
