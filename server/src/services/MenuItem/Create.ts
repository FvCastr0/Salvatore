import { PrismaClient } from '@prisma/client';

class CreateMenuItemService {
  async execute({ name, price, ingredient, thereIsOnStock }: { name: string, price: number, ingredient: string, thereIsOnStock: boolean }) {

    const menu = new PrismaClient().menuItem;
    await menu.findFirst({ where: { name } }) !== null ?
      { statusCode: 400, msg: "This item already exist!" } :
      await menu.create({
        data: {
          name,
          price,
          ingredient,
          thereIsOnStock
        }
      });

    return { statusCode: 200, msg: "Item created successfully" };
  }
}

export { CreateMenuItemService };

