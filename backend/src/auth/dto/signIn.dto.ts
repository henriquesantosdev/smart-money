import { IsEmail, IsString, Min } from 'class-validator';

export class AuthSignInDto {
  @IsEmail()
  email: string;
  @IsString()
  @Min(6)
  password: string;
}
