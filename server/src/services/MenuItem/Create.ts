import CreateMenuItemProps from '@/interface/CreateMenuItemProps';
import ResponseData from '@/interface/ResponseData';
import { PrismaClient } from '@prisma/client';

class CreateMenuItemService {
  async execute({ name, price, ingredient, thereIsOnStock }: CreateMenuItemProps): Promise<ResponseData> {

    const menu = new PrismaClient().menuItem;

    if (await menu.findFirst({ where: { name } }) !== null) {
      return {
        statusCode: 400,
        msg: "This item already exist!"
      }
    } else {
      await menu.create({
        data: {
          name,
          price,
          ingredient,
          thereIsOnStock
        }
      });

      return { msg: "Item created successfully", statusCode: 200 };
    }
  }
}

export { CreateMenuItemService };

