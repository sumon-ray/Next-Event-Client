import { IEvent } from "./event.type";
import { IUser } from "./user.type";

export interface IPayment {
    id: string;
    userId: string;
    eventId: string;
    amount: string;
    method: 'Online' | 'COD';
    status: 'Paid' | 'Unpaid' | 'Pending' | 'Failed';
    transactionId: string;
    gatewayResponse: any | null | undefined;
    createdAt: string;
    updatedAt: string;
    user?: IUser;
    event?: IEvent;
  }

  

