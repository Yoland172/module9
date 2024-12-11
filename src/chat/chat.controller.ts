import {
  Controller,
  Post,
  Body,
  Patch,
  HttpException,
  HttpStatus,
  Delete,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AddNewMembersDto } from './dto/add-members.dto';
import { DeleteUserQueryParam } from './dto/delete-user-query.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async create(@Body() chatData: CreateChatDto) {
    try {
      return await this.chatService.createChat(chatData);
    } catch {
      throw new HttpException(
        'Cant create new chat',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('add-users')
  async addNewMembers(@Body() body: AddNewMembersDto) {
    try {
      await this.chatService.addNewMembers(body.members, body.chatId);
      return {
        success: true,
        message: 'Users successfully added to chat',
      };
    } catch {
      throw new HttpException(
        'Cant add new user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete-user')
  async deleteUserFromChat(@Query() params: DeleteUserQueryParam) {
    try {
      return await this.chatService.deleteUserFromChat(
        params.chatId,
        params.userId,
      );
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Get()
  // findAll() {
  //   return this.chatService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(+id, updateChatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatService.remove(+id);
  // }
}
