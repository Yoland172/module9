import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    description: 'user name',
    example: 'Jhon',
    required: false,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({
    message: 'Name must be a valid string',
  })
  readonly firstName!: string;

  @ApiProperty({
    description: 'User Email',
    example: 'Doe',
    required: false,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address',
    },
  )
  readonly lastName!: string;

  @ApiProperty({
    description: 'active boolean state',
    example: true,
  })
  @IsBoolean({
    message: 'isActive must be a boolean value (true/false)',
  })
  readonly isActive?: boolean;
}
