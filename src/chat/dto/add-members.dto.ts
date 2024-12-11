import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class AddNewMembersDto {
  @ApiProperty({
    description: 'chat id',
    example: '7832696783274',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'chat id is reqired' })
  readonly chatId!: number;

  @ApiProperty({
    description: 'members (can be one or many, but always in array)',
    example: [1, 2, 3, 4],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'members list is empty' })
  @IsNumber({}, { each: true })
  readonly members!: number[];
}
