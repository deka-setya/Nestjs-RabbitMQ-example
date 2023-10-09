import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

const mockUser = {
  email: 'dedeeka83@gmail.com',
  first_name: 'Eka',
  last_name: 'Prasetya',
  avatar: 'image-1',
};

const usersArray = [
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
];

describe('UserService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USER_MODEL',
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(UsersService);
    model = module.get<Model<User>>('USER_MODEL');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        email: 'dedeeka83@gmail.com',
        first_name: 'Eka',
        last_name: 'Prasetya',
        avatar: 'image-1',
      } as any),
    );
    const newUser = await service.create({
      email: 'dedeeka83@gmail.com',
      first_name: 'Eka',
      last_name: 'Prasetya',
      avatar: 'image-1',
    });
    expect(newUser).toEqual(mockUser);
  });
});
