import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';

@Module({
  imports: [AppModule, UsersModule, RabbitMqModule],
})
export class AppModule {}
