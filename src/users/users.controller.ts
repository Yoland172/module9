import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('create')
  async createNewUser(@Body() userData: UserCreateDto) {
    return await this.usersService.createUser(userData);
  }

  // @Patch('join')
  // async joinToChat(@Body() body: JoinToChatDto) {
  //   try {
  //     const test = this.usersService.joinToChat(body.chatId, body.userId);
  //   } catch {
  //     console.error('fvdjn');
  //   }
  // }
}
