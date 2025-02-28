import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccountsService } from './bank-accounts.service';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Get()
  getBankAccounts(@TokenPayloadParam() tokenPayloadDto: TokenPayloadDto) {
    return this.bankAccountsService.getBankAccounts(tokenPayloadDto);
  }

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

  @Patch(':id')
  updateBankAccount(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.bankAccountsService.updateBankAccount(
      id,
      updateBankAccountDto,
      tokenPayloadDto,
    );
  }

  @Delete(':id')
  deleteBankAccount(@Param('id') id: string) {
    return this.bankAccountsService.deleteBankAccount(id);
  }
}
