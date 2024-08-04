import { OrderStatus } from "@prisma/client";

export default interface ChangeOrderStatusProps {
  orderNumber: number,
  status: OrderStatus;
}
