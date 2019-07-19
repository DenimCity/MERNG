import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  email: String,
  createdAt: String
});

export default model('User', userSchema);
