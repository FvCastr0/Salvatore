import { Roles } from "@prisma/client";

export default interface LoginUserProps {
  name: string,
  password: string,
  role?: Roles
}
