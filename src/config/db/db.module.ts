import { TypeOrmModule } from '@nestjs/typeorm';

export const DBSqlModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: '0.0.0.0',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'puppies',
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  entities: [],
});
