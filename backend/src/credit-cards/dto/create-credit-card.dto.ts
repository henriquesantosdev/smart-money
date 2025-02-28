import {
  IsDecimal,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { CardBrandType } from '../@types/card-brand';

export class CreateCreditCardDto {
  @IsString()
  name: string;

  @IsEnum(CardBrandType, {
    message: 'brand must be a valid enum value',
  })
  brand: CardBrandType;

  @IsDecimal()
  avaliable_limit: number;

  @IsNumber()
  @Max(28)
  @Min(1)
  due_day: number;

  @IsNumber()
  @Max(28)
  @Min(1)
  closing_day: number;

  @IsString()
  @IsUUID()
  bank_account_id: string;
}
