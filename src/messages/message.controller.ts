import { Body, Controller, Get, Headers, Inject, Post } from '@nestjs/common';
import { Delete, Param, Patch } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt/dist';
import { MessageService } from './message.service';

@Controller()
export class MessageController {

  constructor(private readonly messageService: MessageService,
    private jwtService: JwtService,) { }

  @Post('wires/messages')
  async createMessage(@Body() body: Object, @Headers() headers: Record<string, string>) {
    const createdAt = new Date();
    const jwt = headers.authorization.split(' ')[1];
    const jwt_isValid = this.jwtService.verify(jwt);
    if (!jwt_isValid) return { "statusCode": 403, "message": "LOG AGAIN", "error": "Forbidden" }
    const jwt_decoded = this.jwtService.decode(jwt);
    const newMessage = {
      user: jwt_decoded['key'],
      title: body['title'],
      text: body['content'],
      createdAt: createdAt.toISOString().split('T')[0],
      comments: [],
      reactions: [],
    };
    return this.messageService.create(newMessage)
  }

  @Get('wires/messages')
  async getMessages() {
    return this.messageService.findAll();
  }

  @Get('wires/messages/me')
  async getMessagesMe(@Headers() headers: Record<string, string>) {
    const jwt = headers.authorization.split(' ')[1];
    const jwt_isValid = this.jwtService.verify(jwt);
    if (!jwt_isValid) return { "statusCode": 403, "message": "LOG AGAIN", "error": "Forbidden" }
    const jwt_decoded = this.jwtService.decode(jwt);
    return this.messageService.findAllMe(jwt_decoded['key']);
  }

  @Get('wires/messages/me/:id')
  async getMessagesId(@Param() params: Object) {
    return this.messageService.findbyId(params['id']);
  }

  @Delete('wires/messages/:id')
  async deleteMessagesId(@Param() params: Object) {
    const action = await this.messageService.deletebyId(params['id']);
    if(action) return { "delete" : true, "status" : "OK" }
    return { "delete" : false, "status" : "OK" }
  }

  @Patch('wires/messages/reaction/:id')
  async pathMessagesReaction(@Param() params: Object, @Body() body: Object, @Headers() headers: Record<string, string>) {
    const jwt = headers.authorization.split(' ')[1];
    const jwt_isValid = this.jwtService.verify(jwt);
    if (!jwt_isValid) return { "statusCode": 403, "message": "LOG AGAIN", "error": "Forbidden" }
    const jwt_decoded = this.jwtService.decode(jwt);
    
    const curateMessage = body['reaction'].charCodeAt();
    return this.messageService.addReaction(params['id'], curateMessage, params['author'], jwt_decoded['key']);
  }

  @Patch('wires/messages/comment/:id')
  async pathMessagesComment(@Param() params: Object, @Body() body: Object, @Headers() headers: Record<string, string>) {
    const jwt = headers.authorization.split(' ')[1];
    const jwt_isValid = this.jwtService.verify(jwt);
    if (!jwt_isValid) return { "statusCode": 403, "message": "LOG AGAIN", "error": "Forbidden" }
    const jwt_decoded = this.jwtService.decode(jwt);
    return this.messageService.addComment(params['id'], params['comment'], params['author'], jwt_decoded['key']);
  }
}
