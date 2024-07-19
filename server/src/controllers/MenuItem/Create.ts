import { CreateMenuItemService } from '@/services/MenuItem/Create';
import { FastifyReply, FastifyRequest } from 'fastify';

class CreateMenuItemController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const menuItemService = new CreateMenuItemService();
    const { name, price, ingredient, thereIsOnStock } = req.body as { name: string, price: number, ingredient: string, thereIsOnStock: boolean };

    if (typeof name !== "string") throw new Error("The 'name' field must be a string")
    else if (name === "") throw new Error("The 'name' field cannot be empty")

    if (typeof price !== "number") throw new Error("The 'price' field must be a number");
    else if (price === 0) throw new Error("The 'name' field cannot be empty")

    if (typeof ingredient !== "string") throw new Error("The 'ingredient' field must be a string");
    else if (name === "") throw new Error("The 'ingredient' field cannot be empty")

    if (typeof thereIsOnStock !== "boolean") throw new Error("The 'Stock' field must be a boolean");

    const menuItem = await menuItemService.execute({ name, price, ingredient, thereIsOnStock });

    if (menuItem.statusCode === 200) {
      rep.send({ msg: "Item created successfully" })
      rep.statusCode = 200;
    } else {
      rep.send({ msg: menuItem.msg })
      rep.statusCode = 400;
    }
  }
}

export { CreateMenuItemController };
