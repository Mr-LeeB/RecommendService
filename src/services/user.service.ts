import { UserClass } from '~/models/user.model';
import { User } from '~/utils/type';

class UserService {
  static async getAllUsers() {
    const users = await UserClass.getAllUsers();

    const result: User[] = [];
    users.forEach((user) => {
      result.push({
        id: user._id.toString(),
        tags: (user.tags as string[]) || []
      });
    });

    return result;
  }
}

export default UserService;
