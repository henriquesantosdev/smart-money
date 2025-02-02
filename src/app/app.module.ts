import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/users/users.module';
import { BankAccountsModule } from 'src/bank-accounts/bank-accounts.module';

@Module({
  imports: [UserModule, BankAccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
