import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(private prisma: PrismaService) {}

  async createBankAccount(
    createBankAccountDto: CreateBankAccountDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {
    console.log(createBankAccountDto, tokenPayloadDto.sub);
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
    } catch (error) {
      return new HttpException(
        'Unable to create account: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getBankAccounts(tokenPayloadDto: TokenPayloadDto) {
    const accounts = await this.prisma.bank_account.findMany({
      where: {
        user_id: tokenPayloadDto.sub,
      },
    });

    return accounts;
  }

  async updateBankAccount(
    id: string,
    updateBankAccountDto: UpdateBankAccountDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {
    const bankAccount = await this.prisma.bank_account.findUnique({
      where: {
        id,
      },
    });

    if (!bankAccount) {
      return new HttpException('Bank account not found', HttpStatus.NOT_FOUND);
    }

    if (bankAccount.user_id !== tokenPayloadDto.sub) {
      return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const updated = await this.prisma.bank_account.update({
        where: {
          id,
        },
        data: {
          bank_name: updateBankAccountDto.bank_name || bankAccount.bank_name,
          account_type:
            updateBankAccountDto.account_type || bankAccount.account_type,
          balance: updateBankAccountDto.balance || bankAccount.balance,
          currency: updateBankAccountDto.currency || bankAccount.currency,
        },
      });

      return updated;
    } catch {
      return new HttpException(
        'Nao foi possivel adicionar a conta bancaria',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteBankAccount(id: string) {
    try {
      await this.prisma.bank_account.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Bank account deleted',
      };
    } catch (error) {
      return new HttpException(
        'Erro ao deletar conta bancaria: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
