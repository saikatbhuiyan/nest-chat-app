import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    return this.usersRepository.create({
      ...createUserInput,
      password: await this.hashingService.hash(createUserInput.password),
    });
  }

  async findAll() {
    return this.usersRepository.find({});
  }

  async findOne(_id: string) {
    return this.usersRepository.findOne({ _id });
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      updateUserInput.password = await this.hashingService.hash(
        updateUserInput.password,
      );
    }

    return this.usersRepository.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...updateUserInput,
        },
      },
    );
  }

  async remove(_id: string) {
    return this.usersRepository.findOneAndDelete({ _id });
  }
}
