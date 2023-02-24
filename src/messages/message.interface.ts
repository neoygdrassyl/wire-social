import { Document } from 'mongoose';

export interface Message extends Document {
  readonly user: string;
  readonly title: string;
  readonly text: string;
  readonly createdAt: string;
  readonly reactions: [{
    reaction: string,
    author: string,
  }];
  readonly comments: [{
    comment: string,
    author: string,
  }];
}
