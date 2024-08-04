import { CreateUserController } from '@/controllers/Users/Create';
import AuthProps from '@/interface/AuthProps';
import ResponseData from '@/interface/ResponseData';
import LoginUserProps from '@/interface/Users/LoginUserProps';
import { PrismaClient, Roles } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';

const verifyToken = (token: string): ResponseData => {
  try {
    if (typeof process.env.SECRET === "string") {
      const data = verify(token, process.env.SECRET) as LoginUserProps;
      if (data) {
        return {
          msg: "Valid token",
          statusCode: 200,
          data: data
        }
      } else {
        return {
          msg: "Invalid token",
          statusCode: 401
        }
      }
    } else {
      return {
        msg: "Missing SECRET enviroment variable",
        statusCode: 400
      }
    }
  } catch (error) {
    return {
      msg: "Internal server error",
      statusCode: 500
    }
  }
};

const verifyIfUserExist = async (user: LoginUserProps) => {
  try {
    const userFromDB = new PrismaClient().users;

    const verifyUser = await userFromDB.findFirst({
      where: {
        name: user.name,
        password: user.password,
        role: user.role
      }
    });
    if (verifyUser !== null) {
      return true;
    } else {
      return false
    }
  }
  catch (e) {
    return false
  }
}

const authToken = async (req: FastifyRequest, rep: FastifyReply, role: Roles): Promise<AuthProps> => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {

    rep.code(401).send({ msg: 'Unauthorized' });
    return {
      msg: "Unauthorized token",
      "access-allowed": false
    };
  }

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const user = verifyToken(token);

    const existentUser = user.data as LoginUserProps

    const verifiedUser = (await verifyIfUserExist(existentUser));

    if (existentUser && verifiedUser) {
      if (
        role === "Manager" && existentUser.role === "Manager" ||
        role === "Employee" && existentUser.role === "Employee" ||
        role === "Employee" && existentUser.role === "Manager"
      ) {
        req.user = existentUser
        rep.code(200);
        return {
          msg: user.msg,
          "access-allowed": true,
          user: {
            name: existentUser.name,
            role: existentUser.role
          }
        }
      } else {
        rep.code(401).send({ msg: `Your role must be ${role}` });
        return {
          msg: "Don't have permission to access",
          "access-allowed": false
        }
      }

    } else {
      rep.code(400).send({ msg: "Invalid token" });
      return {
        msg: "Invalid token",
        "access-allowed": false
      };
    }

  } catch (err) {
    rep.code(401).send({ msg: "Invalid token" });
    return {
      msg: 'Invalid token',
      "access-allowed": false
    };
  }
}


export const authFunction = async (req: FastifyRequest, rep: FastifyReply, response: CreateUserController, role: Roles) => {
  const verify = await authToken(req, rep, role)
  if (verify["access-allowed"]) {
    return response.handle(req, rep)
  } else {
    rep.send({ msg: verify.msg })
  }
}
