import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/Create-user.dto';
import { UpdateUserDto } from './dto/Update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return new HttpException('Usuario nao encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
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
    console.log(id, updateUserDto);

    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    console.log(user);

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updated = await this.prisma.user.update({
      data: {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        email: updateUserDto.email,
        password: updateUserDto.password,
      },
      where: {
        id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
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
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const deleted = await this.prisma.user.update({
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
    const user = await this.prisma.user.findUnique({
      where: {
        id,
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
