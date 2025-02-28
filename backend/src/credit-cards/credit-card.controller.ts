import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Get()
  getCreditCards(@TokenPayloadParam() tokenPayloadDto: TokenPayloadDto) {
    return this.creditCardService.getCreditCards(tokenPayloadDto);
  }

  @Post()
  createCreditCard(
    @Body() createCreditCardDto: CreateCreditCardDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.creditCardService.createCreditCard(
      createCreditCardDto,
      tokenPayloadDto,
    );
  }

  @Patch(':id')
  updateCreditCard(
    @Param('id') id: string,
    @Body() createCreditCardDto: CreateCreditCardDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.creditCardService.updateCreditCard(
      id,
      createCreditCardDto,
      tokenPayloadDto,
    );
  }

  @Delete(':id')
  deleteCreditCard(
    @Param('id') id: string,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.creditCardService.deleteCreditCard(id, tokenPayloadDto);
  }
}
