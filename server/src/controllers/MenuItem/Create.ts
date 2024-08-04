import CreateMenuItemProps from '@/interface/MenuItem/CreateMenuItemProps';
import ResponseData from '@/interface/ResponseData';
import { CreateMenuItemService } from '@/services/MenuItem/Create';
import { FastifyReply, FastifyRequest } from 'fastify';

class CreateMenuItemController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const menuItemService = new CreateMenuItemService();
    const { name, price, ingredient } = req.body as CreateMenuItemProps;

    if (typeof name !== "string") throw new Error("The 'name' field must be a string")
    else if (name === "") throw new Error("The 'name' field cannot be empty")

    if (typeof price !== "number") throw new Error("The 'price' field must be a number");
    else if (price === 0) throw new Error("The 'name' field cannot be empty")

    if (typeof ingredient !== "string") throw new Error("The 'ingredient' field must be a string");
    else if (name === "") throw new Error("The 'ingredient' field cannot be empty")

    const menuItem = await menuItemService.execute({ name, price, ingredient });

    if (menuItem.statusCode === 200) {
      return rep.code(menuItem.statusCode).send({ msg: menuItem.msg, statusCode: menuItem.statusCode })
    } else {
      return rep.code(menuItem.statusCode).send({ msg: menuItem.msg, statusCode: menuItem.statusCode, data: menuItem.data })
    }
  }
}

export { CreateMenuItemController };
