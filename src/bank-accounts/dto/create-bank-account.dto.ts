import { IsEnum, IsInt, IsString } from 'class-validator';
import { AccountType } from '../@types/account-type';

export class CreateBankAccountDto {
  @IsString()
  bank_name: string;

  @IsInt()
  balance?: number;

  @IsString()
  currency: string;

  @IsEnum(AccountType, {
    message: 'accountType must be a valid enum value',
  })
  account_type: AccountType;
}
