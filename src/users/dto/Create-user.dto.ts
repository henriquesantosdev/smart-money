import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Min(6)
  password_hash: string;
}
