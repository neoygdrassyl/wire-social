
import { Document } from 'mongoose';

export interface Auth extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly fullname: string;
  readonly salt: string;
}
