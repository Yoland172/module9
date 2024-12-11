import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersReposetory: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersReposetory.find();
  }

  async createUser(userData: UserCreateDto): Promise<UserCreateDto> {
    try {
      const newUser = this.usersReposetory.create({ ...userData, chats: [] });
      return await this.usersReposetory.save(newUser);
    } catch {
      throw new HttpException('can`t create user', HttpStatus.CONFLICT);
    }
  }

  async findUserById(userId: number) {
    return await this.usersReposetory.findOneBy({ id: userId });
  }

  // async addUserToChat(chatId: number, usersId: number[]) {
  //   for await (const el of usersId) {
  //     const currentUser = await this.usersReposetory.findOne({
  //       select: ['chats'],
  //       where: { id: el },
  //     });

  //     const updatedChats = Array.from(new Set([...currentUser.chats, chatId]));
  //     console.log(
  //       await this.usersReposetory.update({ id: el }, { chats: updatedChats }),
  //     );
  //   }
  // }
}
