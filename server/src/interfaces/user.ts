export interface IUser  {
  uid: number;
  username:string;
  email: string;
  password?: string;
  user_type: number;
  is_active: number;
  email_verified_date: string;
  create_date: string;
}
