export class LoginResponse {
  declare user: UserResponse;
  declare tokens: { accesstoken: string; refreshtoken: string };
}

export class UserResponse {
  declare id: number;
  declare username: string;
  declare email: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}
