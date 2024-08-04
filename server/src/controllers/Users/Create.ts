import ResponseData from "@/interface/ResponseData";
import CreateUserProps from "@/interface/Users/CreateUserProps";
import { CreateUserService } from "@/services/Users/Create";
import { Roles } from "@prisma/client";
import { hashSync } from "bcrypt-ts";
import { FastifyReply, FastifyRequest } from "fastify";

class CreateUserController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { name, password, role } = req.body as CreateUserProps;

    if (name === "") return { msg: "The name field can't be null", statusCode: 400 }
    if (password === "") return { msg: "The name field can't be null", statusCode: 400 }
    if (Roles.Employee !== role && Roles.Manager !== role) return { msg: "This role doesn't exist", statusCode: 400 }

    const hashedPass = hashSync(password, 10)

    const createUser = await new CreateUserService().execute({ name, password: hashedPass, role })

    return rep.code(createUser.statusCode).send({ msg: createUser.msg, statusCode: createUser.statusCode })
  }
}

export { CreateUserController };

