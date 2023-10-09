import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { RabbitMQClient } from '../rabbit-mq/rabbit-mq.client';
import { RabbitMQPublisher } from '../rabbit-mq/rabbit-mq.publisher';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rabbitMQClient: RabbitMQClient,
    private readonly rabbitMQPublisher: RabbitMQPublisher,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const message = 'Hello RabbitMQ!';
    const response = await this.rabbitMQClient.sendMessage(
      'rpc_queue',
      message,
    );
    const dataUser = this.usersService.create(createUserDto);
    this.rabbitMQPublisher.publishMessage(
      'pubsub_exchange',
      'pubsub_key',
      JSON.stringify(dataUser),
    );
    return response;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete('/:id/avatar')
  deleteAvatarData(@Param('id') id: string) {
    return this.usersService.deleteAvatar(id);
  }
}
