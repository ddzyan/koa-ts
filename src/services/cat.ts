import { Service } from "typedi";

@Service()
export default class CatService {
  public getAll() {
    return "This action returns all cats";
  }
}
