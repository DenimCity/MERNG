import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';
import {validateRegisterInput, validateLoginInput} from '../../utils/validator';
import { generateToken } from '../../utils/token';

export const LOGIN = async (_, {username, password }) => {
                const {valid, errors} = validateLoginInput(username, password);

                  if (!valid){
                        throw new UserInputError("Errors", { errors })
                  }

                  const user = await User.findOne({username});

                  if (!user) {
                        errors.general = "User Not Found"
                        throw new UserInputError('User Not Found', {errors})
                  }

                  const match = await bcrypt.compare(password, user.password)
                  if (!match) {
                        errors.general = "Wrong credentials"
                        throw new UserInputError('Wrong credentials', {errors})
                  }

                  const token = generateToken(user)
                   return {
                        ...user._doc,
                        id: user._id,
                        token,
                        createdAt: user.createdAt
                  }
}

export const REGISTER = async (_, { registerInput: { username, email, password, confirmPassword }}, context) => {
      const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
                   if(!valid) {
                         throw new UserInputError('Input Validation Error', {errors})
                   }
                  const user = await User.findOne({ username: username })
                  if (user) {
                        throw new UserInputError('Username is taken', {
                              errors: {
                                    username: 'This username is taken'
                              }
                        })
                  }
                  // Hash Password
                  password = await bcrypt.hash(password, 12);
                  const newUser = new User({
                         email, 
                        password,
                        username,
                        createdAt: new Date().toISOString()
                  });

                  const res = await newUser.save();

                  const token = generateToken(res)

                  return {
                        ...res._doc,
                        id: res._id,
                        token,
                        createdAt: res.createdAt
                  }

}