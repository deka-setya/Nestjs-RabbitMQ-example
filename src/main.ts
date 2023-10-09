import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import amqp from 'amqp-connection-manager';

async function bootstrap() {
  // const url =
  //   'amqp://' + process.env.RABBITMQ_URL + ':' + process.env.RABBITMQ_PORT;
  // const url = 'amqp://localhost:5672';
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [url],
  //     queue: 'users_queue',
  //     queueOptions: { durable: false },
  //   },
  // });
  await app.listen(3000);
}
bootstrap();
