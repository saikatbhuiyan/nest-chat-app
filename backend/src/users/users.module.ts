import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '../common/database/database.module';
import { User, UserSchema } from './entities/user.entity';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersResolver,
    UsersService,
    UsersRepository,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class UsersModule {}
