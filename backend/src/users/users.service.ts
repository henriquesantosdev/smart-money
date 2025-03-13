import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/Create-user.dto';
import { UpdateUserDto } from './dto/Update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingServiceProtocol,
  ) {}

  async findAllUsers() {
    const users = await this.prisma.user.findMany({
      where: {
        active: true,
      },
      include: {
        bank_accounts: true,
      },
    });
    return users;
  }

  async findUser(tokenPayloadDto: TokenPayloadDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: tokenPayloadDto.sub,
        active: true,
      },
      include: {
        bank_accounts: true,
      },
    });

    if (!user) {
      return new HttpException('Usuario nao encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const passwordHash = await this.hashingService.hash(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        email: createUserDto.email,
        password_hash: passwordHash,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        created_at: true,
      },
    });

    if (!user) {
      new HttpException(
        'Nao foi possivel criar usuario',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: tokenPayloadDto.sub,
        active: true,
      },
    });

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.id !== tokenPayloadDto.sub) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const passwordHash = updateUserDto.password
      ? await this.hashingService.hash(updateUserDto.password)
      : user.password_hash;

    const updated = await this.prisma.user.update({
      data: {
        first_name: updateUserDto.first_name || user.first_name,
        last_name: updateUserDto.last_name || user.last_name,
        email: updateUserDto.email || user.email,
        password_hash: passwordHash,
      },
      where: {
        id: tokenPayloadDto.sub,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    if (!updated) {
      return new HttpException(
        'Nao foi possivel atualizar o usuario',
        HttpStatus.BAD_REQUEST,
      );
    }

    return updated;
  }

  async softDeleteUser(tokenPayloadDto: TokenPayloadDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: tokenPayloadDto.sub,
        active: true,
      },
    });

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.id !== tokenPayloadDto.sub) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const deleted = await this.prisma.user.update({
      data: {
        active: false,
      },
      where: {
        id: tokenPayloadDto.sub,
      },
    });

    if (!deleted) {
      return new HttpException(
        'Nao foi possivel deletar usuario',
        HttpStatus.BAD_REQUEST,
      );
    }

    return deleted;
  }

  async activeUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        active: false,
      },
    });

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const activated = await this.prisma.user.update({
      data: {
        active: true,
      },
      where: {
        id,
      },
    });

    if (!activated) {
      return new HttpException(
        'Nao foi possivel deletar usuario',
        HttpStatus.BAD_REQUEST,
      );
    }

    return activated;
  }
}
