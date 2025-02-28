import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';

@Module({
  imports: [PrismaModule],
  controllers: [CreditCardController],
  providers: [CreditCardService],
  exports: [],
})
export class CreditCardModule {}
