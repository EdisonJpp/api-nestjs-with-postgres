import { ApiProperty } from '@nestjs/swagger';

export class AddProductDto {
  @ApiProperty({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ type: String, required: true })
  readonly description: string;

  @ApiProperty({
    type: Number,
    description: '5000',
    required: true,
    name: 'price',
  })
  readonly price: number;
}
