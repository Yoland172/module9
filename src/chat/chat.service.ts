import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      name: chatData.name,
    });
    return await this.chatReposetory.save(newChat);
  }

  async addNewMembers(members: number[], chatId: number) {
    const currentChat = await this.chatReposetory.findOne({
      relations: ['members'],
      where: { id: chatId },
    });

    members.forEach(async (el) => {
      const user = await this.usersService.findUserById(el);
      if (!user) {
        throw new NotFoundException(`User with id ${el} not found`);
      }
      currentChat.members.push(user);
    });

    await this.chatReposetory.save(currentChat);
  }

  async deleteUserFromChat(chatId: number, userId: number) {
    const currentChat = await this.chatReposetory.findOne({
      where: { id: chatId },
      relations: ['members'],
    });
    const userIndex = currentChat.members.findIndex((el) => el.id === userId);
    if (userIndex === -1) {
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    currentChat.members.splice(userIndex, 1);

    return await this.chatReposetory.save(currentChat);

    //currentChat.members
  }

  async findChatById(chatId: number) {
    return await this.chatReposetory.findOneBy({ id: chatId });
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
