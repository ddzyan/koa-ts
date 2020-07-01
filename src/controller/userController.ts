import User from '../dto/userDto';

class UserController {
  static async getUserById(id: number): Promise<User> {
    return {
      name: '流水年华',
      age: 12,
      id,
    };
  }
}

export default UserController;
