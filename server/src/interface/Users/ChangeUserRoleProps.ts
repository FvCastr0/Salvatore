import { Roles } from "@prisma/client";

export default interface ChangeUserRoleProps {
  id: string,
  role: Roles
}
