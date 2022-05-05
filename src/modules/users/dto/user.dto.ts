import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty({ type: String, required: true })
  readonly name: string;

  @ApiProperty({ type: String, required: true })
  readonly lastName: string;

  @ApiProperty({ type: String, required: true })
  readonly email: string;

  @ApiProperty({ type: String, required: true })
  readonly username: string;

  @ApiProperty({ type: String, required: true })
  readonly password: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  readonly phone: number;
}
