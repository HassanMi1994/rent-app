import { PaymentType } from "./enum/PaymentType";
import { User } from "./user.model";


export class Payment {
  amount: number;
  paymentType: PaymentType;
  dateTime: Date;
  createdBy: User;
}
