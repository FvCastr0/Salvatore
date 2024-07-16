import prismaClient from '@/prisma';

class CreateMenuItemService {
  async execute({ name, price, ingredient, thereIsOnStock }: { name: string, price: number, ingredient: string, thereIsOnStock: boolean }) {
    const menuItem = await prismaClient.menuItem.create({
      data: {
        name,
        price,
        ingredient,
        thereIsOnStock
      }
    })

    return { ...menuItem }
  }
}

export { CreateMenuItemService };

