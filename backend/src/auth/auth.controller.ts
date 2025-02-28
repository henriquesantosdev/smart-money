import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { Public } from './guard/isPublic';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signin')
  sigIn(@Body() authSignInDto: AuthSignInDto) {
    return this.authService.signIn(authSignInDto);
  }
}
