import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    description: 'chat name',
    example: 'nam',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({
    message: 'Name must be a valid string',
  })
  readonly name!: string;

  @ApiProperty({
    description: '',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  readonly members!: number[];
}
