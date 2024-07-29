import { Roles } from "@prisma/client";

export default interface AuthProps {
  "access-allowed": boolean,
  msg: string,
  user?: {
    name: string,
    role: Roles
  }
}
