import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthSignInDto } from './dto/signIn.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private jwtService: JwtService,
  ) {}

  async signIn(authSignInDto: AuthSignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authSignInDto.email,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          message: 'User not exists',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordIsValid = this.hashingService.compare(
      authSignInDto.password,
      user.password_hash,
    );

    if (!passwordIsValid) {
      throw new HttpException(
        'Password or email incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      },
    );

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      token,
    };
  }
}
