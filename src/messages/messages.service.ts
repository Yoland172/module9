import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private usersService: UsersService,
    private chatService: ChatService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const currentChat = await this.chatService.findChatById(
      createMessageDto.chatId,
    );
    const currentUser = await this.usersService.findUserById(
      createMessageDto.userId,
    );

    const newMessage = this.messageRepository.create({
      text: createMessageDto.text,
      chat: currentChat,
      user: currentUser,
    });

    await this.messageRepository.save(newMessage);
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
