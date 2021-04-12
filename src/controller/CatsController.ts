import { Controller } from '../decorator/Controller';
import { GET } from '../decorator/Method';

@Controller('/cats')
class CatsController {
  @GET('/index')
  findAll(): string {
    return 'This action returns all cats';
  }

  @GET('/:id')
  findOne(): string {
    return 'This action returns a specified cat';
  }
}

export default CatsController;
