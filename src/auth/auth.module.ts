import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/model/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory:()=>{
        return {
          global: true,
          signOptions: {expiresIn: '4d'},
          secret: process.env.JWT_SECRET,
        }
      }
    }),
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema}
      ]
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
