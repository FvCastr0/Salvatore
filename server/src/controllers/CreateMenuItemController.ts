import { CreateMenuItemService } from '@/services/CreateMenuItemService';
import { FastifyReply, FastifyRequest } from 'fastify';

class CreateMenuItemController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const menuItemService = new CreateMenuItemService();
    const { name, price, ingredient, thereIsOnStock } = req.body as { name: string, price: number, ingredient: string, thereIsOnStock: boolean };

    const menuItem = await menuItemService.execute({ name, price, ingredient, thereIsOnStock });

    rep.send(menuItem);
  }
}

export { CreateMenuItemController };
