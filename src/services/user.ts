import { Model } from "sequelize/types";
import { Service, Inject } from "typedi";

@Service()
export default class UserService {
  constructor(@Inject("User") private userModel) {}

  public async getAll() {
    const userList = await this.userModel.findAll({
      raw: true
    });
    return userList;
  }
}
