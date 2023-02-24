import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Auth } from './auth.interface';
import { UserDto } from './user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MODEL') private readonly AuthModel: Model<Auth>,
    private jwtService: JwtService,
  ) { }

  async signup(Dto: UserDto): Promise<Auth> {
    const created = this.AuthModel.create(Dto);
    return created;
  }


  async signin(username: String, password: String): Promise<Object> {
    let logInUser = await this.AuthModel.findOne({ username: username, password: password }).exec();
    if (logInUser) {
      const payload = { username: logInUser.username, key: logInUser._id };
      return { access_token: this.jwtService.sign(payload), "expires_in": "1d", "message": "Successfully logged in", "status": true }
    }
    else return { status: 404, message: 'User not found' }
  }

  async findByUserName(username: String): Promise<Auth> {
    return this.AuthModel.findOne({username: username}).exec();
  }
}
