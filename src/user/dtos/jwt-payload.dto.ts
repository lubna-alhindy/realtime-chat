export class JWTPayloadDto {
  sub: {
    id: number;
    email: string;
    userName: string;
  };
  iat: number;
  exp: number;
}
