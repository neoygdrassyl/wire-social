import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('wires/auth/signup')
  async signup(@Body() createUserDto: UserDto) {
    const salt = saltGenerator();
    var SHA256 = require("crypto-js/sha256");
    const hashedPassword = SHA256(salt +  createUserDto.password);
    const newUser = {...createUserDto, salt: salt, password: hashedPassword}

    return this.authService.signup(newUser);
  }

  @Post('wires/auth/signin')
  async signin(@Body() body: Object) {
    let user = await this.authService.findByUserName(body['username']);
    if(!user) return { "statusCode": 403, "message": "USER NOT FOUND", "error": "Forbidden" }
    const salt = user.salt;
    var SHA256 = require("crypto-js/sha256");
    const hashedPassword = String(SHA256(salt + body['password']));
    return this.authService.signin(body['username'], hashedPassword);
  }
}

function saltGenerator() {
  var length = 32,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}