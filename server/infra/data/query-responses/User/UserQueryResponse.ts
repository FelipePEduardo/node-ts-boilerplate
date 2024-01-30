export type UserQueryResponse = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
};
