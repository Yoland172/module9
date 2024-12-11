import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'message is reqired' })
  readonly text: string;

  @IsNumber()
  @IsNotEmpty({ message: 'user id is reqired' })
  userId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'chat id is reqired' })
  chatId: number;
}
