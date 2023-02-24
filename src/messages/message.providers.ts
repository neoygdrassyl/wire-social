import { Connection } from 'mongoose';
import { MessageSchema } from 'src/schemas/message.schemas';


export const MessagesProviders = [
  {
    provide: 'MESSAGE_MODEL',
    useFactory: (connection: Connection) => connection.model('Messages', MessageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
