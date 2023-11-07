import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  // declaring the repo variable for easy access later
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(User),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
        UsersService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(User),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    // Save the instance of the repository and set the correct generics
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null if password dont match', async () => {
    const testUser = new User();
    testUser.setUser(
      1,
      faker.internet.email(),
      faker.internet.userName(),
      faker.internet.password(),
      faker.number.int({
        min: 1,
        max: 3,
      }),
    );

    jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(testUser);

    const result = await service.validateUser(
      testUser.email,
      faker.internet.password(),
    );

    expect(result).toBeNull();
  });

  it('should return null if dont find user', async () => {
    const testUser = new User();
    testUser.setUser(
      1,
      faker.internet.email(),
      faker.internet.userName(),
      faker.internet.password(),
      faker.number.int({
        min: 1,
        max: 3,
      }),
    );

    jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(testUser);

    const result = await service.validateUser(
      faker.internet.email(),
      testUser.password,
    );

    expect(result).toBeNull();
  });

  it.skip('should return user', async () => {
    const testUser = new User();
    testUser.setUser(
      1,
      faker.internet.email(),
      faker.internet.userName(),
      faker.internet.password(),
      faker.number.int({
        min: 1,
        max: 3,
      }),
    );

    jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(testUser);

    const result = await service.validateUser(
      testUser.email,
      testUser.password,
    );

    expect(result.name).toEqual(testUser.name);
  });
});
