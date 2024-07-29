import ResponseData from "@/interface/ResponseData";
import LoginUserProps from "@/interface/Users/LoginUserProps";
import { LoginUserService } from "@/services/Users/Login";
import { FastifyReply, FastifyRequest } from "fastify";

class LoginUserController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { name, password } = req.body as LoginUserProps;

    if (name === "") return { msg: "The name field can't be null", statusCode: 400 }
    if (password === "") return { msg: "The name field can't be null", statusCode: 400 }
    const login = await new LoginUserService().execute({ name, password })

    return rep.code(login.statusCode).send({ msg: login.msg, statusCode: login.statusCode, data: login.data })
  }
}

export { LoginUserController };

