import { IsNotEmpty, IsNumber } from 'class-validator';

export class JoinToChatDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Email is required' })
  chatId!: number;

  @IsNumber()
  @IsNotEmpty({ message: 'User is required' })
  userId!: number;
}
