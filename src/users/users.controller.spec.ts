import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                email: 'dedeeka83@gmail.com',
                first_name: 'Eka',
                last_name: 'Prasetya',
                avatar: 'image-1',
              },
              {
                email: 'dedeeka85@gmail.com',
                first_name: 'Dede',
                last_name: 'Prasetya',
                avatar: 'image-2',
              },
            ]),
            create: jest
              .fn()
              .mockImplementation((createUserDto: CreateUserDto) =>
                Promise.resolve({ _id: '1', ...createUserDto }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get(UsersController);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'dedeeka85@gmail.com',
        first_name: 'Dede',
        last_name: 'Prasetya',
        avatar: 'image-1',
      };

      expect(controller.create(createUserDto)).resolves.toEqual({
        _id: '1',
        ...createUserDto,
      });
    });
  });

  describe('findAll()', () => {
    it('should get an array of users', () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          email: 'dedeeka83@gmail.com',
          first_name: 'Eka',
          last_name: 'Prasetya',
          avatar: 'image-1',
        },
        {
          email: 'dedeeka85@gmail.com',
          first_name: 'Dede',
          last_name: 'Prasetya',
          avatar: 'image-2',
        },
      ]);
    });
  });
});
