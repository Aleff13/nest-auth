import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'auth',
    username: 'root',
    password: '123456',
    entities: [...entities],
    synchronize: true,
  });
