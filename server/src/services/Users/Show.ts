import ResponseData from "@/interface/ResponseData";
import { PrismaClient } from "@prisma/client";

class ShowUsersService {
  async execute(): Promise<ResponseData> {
    try {
      const getUsers = new PrismaClient()
        .users.findMany({
          select: {
            "name": true,
            "role": true,
          }
        });

      return { msg: 'All users has been loaded!', statusCode: 200, data: await getUsers }
    } catch (e) {
      return { msg: "Internal server error!", statusCode: 400, data: { err: e } };
    }
  }

}

export { ShowUsersService };

