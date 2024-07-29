import ResponseData from "@/interface/ResponseData";
import ChangeUserRoleProps from "@/interface/Users/ChangeUserRoleProps";
import { PrismaClient } from "@prisma/client";

class ChangeUserRoleService {
  async execute({ id, role }: ChangeUserRoleProps): Promise<ResponseData> {
    try {
      const user = new PrismaClient().users;

      const data = await user.update({
        where: {
          id
        },
        data: {
          role
        }

      })
      return {
        msg: `Role of ${data.name} changed to ${data.role}`,
        statusCode: 200,
      }
    } catch (e) {
      return {
        msg: `Internal server error`,
        statusCode: 500,
        data: { e }
      }
    }

  }
}


export { ChangeUserRoleService };

