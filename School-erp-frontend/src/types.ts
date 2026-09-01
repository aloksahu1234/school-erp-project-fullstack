export type UserRole =
  | "admin"
  | "teacher"
  | "student"
  | "parent";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Student = {
  _id: string;
  name: string;
  rollNo: string;
  class: string;
  section: string;
};

export type Fee = {
  _id: string;
  student:
    | string
    | {
        _id: string;
        name: string;
        rollNo: string;
        class: string;
        section: string;
      };
  feeType: string;
  amount: number;
  status: "pending" | "paid" | "due";
  dueDate: string;
  paymentDate?: string;
  receiptNumber?: string;
};