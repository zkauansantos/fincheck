import { TransactionType } from "./Transaction";

export interface Category {
  id: string;
  userId: string;
  name: string;
  icon: string;
  type: TransactionType
}