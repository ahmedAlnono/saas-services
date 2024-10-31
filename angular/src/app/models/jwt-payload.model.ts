export interface JwtPayload {
  sub: number;
  email: string;
  password: string;
  iat: number;
  ext: number;
}
export interface AccessToken {
  access_token: string;
}
