import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardService {
  constructor(private readonly prisma: PrismaService) {}

  async getCreditCards(tokenPayloadDto: TokenPayloadDto) {
    console.log(tokenPayloadDto.sub);
    console.log('prismaService:', this.prisma);

    const creditCard = await this.prisma.user.findFirst({
      where: {
        id: tokenPayloadDto.sub,
      },
      include: {
        bank_accounts: {
          include: {
            Credit_card: true,
          },
        },
      },
    });

    console.log(creditCard);

    return creditCard;
  }

  createCreditCard(
    createCreditCardDto: CreateCreditCardDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {}

  updateCreditCard(
    id: string,
    createCreditCardDto: CreateCreditCardDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {}

  deleteCreditCard(id, tokenPayloadDto: TokenPayloadDto) {}
}
