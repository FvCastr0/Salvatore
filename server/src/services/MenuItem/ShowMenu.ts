import ResponseData from "@/interface/ResponseData";
import { PrismaClient } from "@prisma/client";

class ShowMenuService {
  async execute(): Promise<ResponseData> {
    try {
      const getMenu = new PrismaClient()
        .menuItem.findMany({
          select: {
            "name": true,
            "price": true,
            "ingredient": true,
          }
        });

      return { msg: 'All items have been loaded', statusCode: 200, data: await getMenu }
    } catch (e) {
      return { msg: "Internal server error!", statusCode: 400, data: { err: e } };
    }
  }

}

export { ShowMenuService };

