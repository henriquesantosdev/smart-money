import { Body, Controller, Post } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccountsService } from './bank-accounts.service';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  createBankAccount(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsService.createBankAccount(createBankAccountDto);
  }
}
