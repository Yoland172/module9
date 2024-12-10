import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatReposetory: Repository<Chat>,
    private usersService: UsersService,
  ) {}

  async createChat(chatData: CreateChatDto) {
    const newChat = this.chatReposetory.create({
      ...chatData,
      members: chatData.members || [],
    });
    return await this.chatReposetory.save(newChat);
  }

  async addNewMembers(members: number[], chatId: number) {
    console.log(members, chatId);
    const currentChat = await this.chatReposetory.findOne({
      select: ['members'],
      where: { id: chatId },
    });
    const updatedMembers = [...new Set([...currentChat.members, ...members])];
    console.log(updatedMembers);
    console.log(
      await this.chatReposetory.update(
        { id: chatId },
        { members: updatedMembers },
      ),
    );

    await this.usersService.addUserToChat(chatId, members);
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
