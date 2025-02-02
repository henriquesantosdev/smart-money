import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class BankAccountsService {
  constructor(private prisma: PrismaService) {}

  async createBankAccount(createBankAccountDto: CreateBankAccountDto) {
    try {
      console.log(createBankAccountDto);
      const account = await this.prisma.bank_accounts.create({
        data: {
          user_id: createBankAccountDto.user_id,
          bank_name: createBankAccountDto.bank_name,
          account_type: createBankAccountDto.account_type,
          balance: createBankAccountDto.balance,
          currency: createBankAccountDto.currency,
        },
      });

      return account;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
