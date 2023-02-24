import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthProviders } from './auth/auth.providers';
import { DatabaseModule } from './database/database.module';
import { MessageController } from './messages/message.controller';
import { MessagesProviders } from './messages/message.providers';
import { MessageService } from './messages/message.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule } from '@nestjs/config';

const CONFIG = ConfigModule.forRoot();
const JWTM = JwtModule.register({
  secret: process.env.JWT_KEY,
  signOptions: { expiresIn: '1d' },
});

@Module({
  imports: [DatabaseModule, CONFIG, JWTM],
  controllers: [AppController, AuthController, MessageController],
  providers: [AppService, AuthService, MessageService, ...MessagesProviders, ...AuthProviders],
})
export class AppModule {}
