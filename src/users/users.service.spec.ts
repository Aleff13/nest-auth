import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { faker } from '@faker-js/faker';

describe('UsersService', () => {
  let service: UsersService;
  // declaring the repo variable for easy access later
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(User),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    // Save the instance of the repository and set the correct generics
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return for findAll', async () => {
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

    jest.spyOn(repo, 'find').mockResolvedValueOnce([testUser]);

    const result = await service.findAll();

    expect(result).not.toHaveLength(0);
  });

  it('should return for findByEmail', async () => {
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

    const result = await service.findUserByEmail(testUser.email);

    expect(result.name).toEqual(testUser.name);
  });

  // it('should return create a new user', async () => {
  //   const testUser: User = new User();
  //   testUser.email = faker.internet.email();
  //   testUser.password = faker.internet.password();
  //   testUser.name = faker.internet.userName();
  //   testUser.role = faker.number.int({
  //     min: 1,
  //     max: 3,
  //   });

  //   jest.spyOn(repo, 'create').mockImplementation(testUser);
  //   jest.spyOn(repo, 'save').mockResolvedValueOnce(testUser);

  //   const { email } = await service.create(testUser);

  //   expect(email).toEqual(testUser.email);
  // });
});
