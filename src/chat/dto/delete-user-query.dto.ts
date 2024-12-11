import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DeleteUserQueryParam {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  chatId: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  userId: number;
}
