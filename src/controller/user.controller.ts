import User from '../dto/user.dto';
import { CreateUser } from '../interface/user.interface';

class UserController {
  static async getUserById(id: number): Promise<User> {
    return {
      name: '流水年华',
      age: 12,
      id,
    };
  }

  static async createUser(user: CreateUser): Promise<Boolean> {
    return !!user;
  }
}

export default UserController;
