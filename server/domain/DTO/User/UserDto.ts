export type UserDto = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date | null;
  role: string;
};
