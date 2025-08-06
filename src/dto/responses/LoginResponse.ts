export class LoginResponse {
  declare user: UserResponse;
  declare tokens: { accesstoken: string; refreshtoken: string };
}

export class UserResponse {
  declare id: number;
  declare username: string;
  declare email: string;
  declare created_at: Date;
  declare updated_at: Date;
}
