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

  public async getUserById(id: number) {
    const userInfo = await this.userModel.findByPk(id, {
      include: [
        {
          association: this.userModel.associations.Classroom,
          attributes: ["grade", "prom"]
        }
      ],
      raw: true,
      nest: true,
      logging: true
    });
    return userInfo;
  }
}
