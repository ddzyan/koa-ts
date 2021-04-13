import { Context, Next } from 'koa';
import { Controller } from '../decorator/Controller';
import { GET } from '../decorator/Method';

@Controller('/cats')
class CatsController {
  @GET('/all')
  findAll(ctx: Context, next: Next): void {
    ctx.body = 'This action returns all cats';
  }

  @GET('/:id')
  findOne(ctx: Context, next: Next): void {
    ctx.body = 'This action returns a specified cat';
  }
}

export default CatsController;
