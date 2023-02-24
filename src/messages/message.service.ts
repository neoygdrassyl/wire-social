import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { MessageDto } from './message.dto';
import { Message } from './message.interface';

@Injectable()
export class MessageService {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject('MESSAGE_MODEL') private MessageModel: Model<Message>,
  ) { }

  getUser(id: Number): object { return {} }

  async create(Dto: MessageDto): Promise<Message> {
    const created = new this.MessageModel(Dto);
    return created.save();
  }

  async findAll(): Promise<Message[]> {
    return this.MessageModel.find().exec();
  }

  async findAllMe(key: String): Promise<Message[]> {
    return this.MessageModel.find({ user: key }).exec();
  }

  async findbyId(id: String): Promise<Message> {
    return this.MessageModel.findById(id).exec();
  }

  async deletebyId(id: String): Promise<Message> {
    return this.MessageModel.findByIdAndDelete(id).exec();
  }

  async addReaction(id: String, reaction: String, author: String, logedUserId): Promise<any> {
    const checkIfSelfCommnent = await this.MessageModel.findById(id);
    if(checkIfSelfCommnent.user == logedUserId) return { "statusCode": 403, "message": "THIS IS YOUR OWN COMMENT", "error": "Forbidden" }
    else return this.MessageModel.findByIdAndUpdate(id, { $push: { reactions: { reaction: reaction, author: author } } }).exec();
  }

  async addComment(id: String, comment: String, author: String, logedUserId): Promise<any> {
    const checkIfSelfCommnent = await this.MessageModel.findById(id);
    if(checkIfSelfCommnent.user == logedUserId) return { "statusCode": 403, "message": "THIS IS YOUR OWN COMMENT", "error": "Forbidden" }
    else return this.MessageModel.findByIdAndUpdate(id, { $push: { comments: { comment: comment, author: author } } }).exec();
  }

}
