import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepositary } from './repositories/user.repositary';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'IUserRepository',
      useClass: UserRepositary,
    }

  ],
})
export class AuthModule { }
