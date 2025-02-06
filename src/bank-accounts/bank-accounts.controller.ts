import { Body, Controller, Post } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccountsService } from './bank-accounts.service';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  createBankAccount(
    @Body() createBankAccountDto: CreateBankAccountDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.bankAccountsService.createBankAccount(
      createBankAccountDto,
      tokenPayloadDto,
    );
  }
}
