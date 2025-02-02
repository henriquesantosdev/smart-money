import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BankAccountController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';

@Module({
  imports: [PrismaModule],
  controllers: [BankAccountController],
  providers: [BankAccountsService],
  exports: [],
})
export class BankAccountsModule {}
