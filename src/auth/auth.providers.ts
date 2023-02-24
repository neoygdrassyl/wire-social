import { Connection } from 'mongoose';
import { AuthSchema } from 'src/schemas/auth.schema';


export const AuthProviders = [
  {
    provide: 'AUTH_MODEL',
    useFactory: (connection: Connection) => connection.model('Auth', AuthSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
