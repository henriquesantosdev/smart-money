import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/Create-user.dto';
import { UpdateUserDto } from './dto/Update-user.dto';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { Public } from 'src/auth/guard/isPublic';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get()
  findUser(@TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.userService.findUser(tokenPayload);
  }

  @Public()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch()
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    console.log(tokenPayload);
    return this.userService.updateUser(updateUserDto, tokenPayload);
  }

  @Delete('/delete')
  softDeleteUser(@TokenPayloadParam() tokenPayloadDto: TokenPayloadDto) {
    return this.userService.softDeleteUser(tokenPayloadDto);
  }

  @Patch('/active/:id')
  activateUser(@Param('id') id: string) {
    return this.userService.activeUser(id);
  }
}
