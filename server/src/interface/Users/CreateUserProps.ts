import { Roles } from "@prisma/client";

export default interface CreateUserProp {
  name: string,
  password: string,
  role: Roles
}
