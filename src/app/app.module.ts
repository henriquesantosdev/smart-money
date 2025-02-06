import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/users/users.module';
import { BankAccountsModule } from 'src/bank-accounts/bank-accounts.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, BankAccountsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
