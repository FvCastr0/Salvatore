import { OrderStatus } from "@prisma/client"

export default interface MakeOrderProps {
  requests: string[]
  status: OrderStatus
}
