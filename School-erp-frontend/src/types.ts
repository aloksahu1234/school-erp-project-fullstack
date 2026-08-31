export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student" | "parent";
};

export type Student = {
  _id: string;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  guardianName: string;
  guardianPhone: string;
};