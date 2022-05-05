import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 't_products' })
export class ProductModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: String })
  @Column()
  title?: string;

  @ApiProperty({ type: String })
  @Column({ name: 'last_name' })
  description?: string;

  @ApiProperty({ type: String })
  @Column({ unique: true })
  price?: number;
}
