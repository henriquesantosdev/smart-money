import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/Create-user.dto';
import { UpdateUserDto } from './dto/Update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingServiceProtocol,
  ) {}

  async findAllUsers() {
    const users = await this.prisma.users.findMany({
      include: {
        bank_accounts: true,
      },
    });
    return users;
  }

  async findUser(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
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
    console.log(createUserDto);
    const passwordHash = await this.hashingService.hash(createUserDto.password);

    const user = await this.prisma.users.create({
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

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const passwordHash = await this.hashingService.hash(updateUserDto.password);

    const updated = await this.prisma.users.update({
      data: {
        first_name: updateUserDto.first_name,
        last_name: updateUserDto.last_name,
        email: updateUserDto.email,
        password_hash: passwordHash,
      },
      where: {
        id,
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

  async softDeleteUser(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const deleted = await this.prisma.users.update({
      data: {
        active: false,
      },
      where: {
        id,
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
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const activated = await this.prisma.users.update({
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
