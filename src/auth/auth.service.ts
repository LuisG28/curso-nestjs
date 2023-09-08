import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/model/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { comparePlainToHash, plainToHash } from './utilities/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService : JwtService,
        @InjectModel(User.name) private readonly userScheme : Model<User>
    ){}

    public async login (userBody: LoginAuthDto) {
        const userExist = await this.userScheme.findOne({ email : userBody.email});
        if (!userExist) throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);

        const isCheck = await comparePlainToHash(userBody.password, userExist.password);
        if (!isCheck) throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT); 
        
        const userFlat = userExist.toObject();
        delete userFlat.password;

        const payload = {
            id : userFlat._id,
        }
        const token = await this.jwtService.sign(payload);

        const data = {
            token,
            user : userFlat,
        }
        return data;
    }

    public async register(userBody: RegisterAuthDto){
        const { password, ...user } = userBody;
        const userParse = {...user, password: await plainToHash(password)}

        return this.userScheme.create(userParse);
    }
}
