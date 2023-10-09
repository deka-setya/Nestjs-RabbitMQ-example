import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  avatar: String,
});
