import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class BankAccountsService {
  constructor(private prisma: PrismaService) {}

  async createBankAccount(
    createBankAccountDto: CreateBankAccountDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {
    try {
      const account = await this.prisma.bank_account.create({
        data: {
          user_id: tokenPayloadDto.sub,
          bank_name: createBankAccountDto.bank_name,
          account_type: createBankAccountDto.account_type,
          balance: createBankAccountDto.balance,
          currency: createBankAccountDto.currency,
        },
      });

      return account;
    } catch {
      return new HttpException(
        'Unable to create account',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
