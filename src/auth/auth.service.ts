import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from 'src/users/model/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userScheme : Model<User>
    ){}

    register(userBody: RegisterAuthDto){
        
        return this.userScheme.create(userBody);
    }
}
