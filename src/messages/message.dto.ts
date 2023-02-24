export class MessageDto {
    user: string;
    title: string;
    text: string;
    createdAt: string;
    reactions: Reaction[];
    comments: Comment[];
  }

  class Reaction {
    reaction: string;
    author: string;
  }
  
  class Comment {
    comment: string;
    author: string;
  }