import jwt from 'jsonwebtoken';

export const generateToken = user => jwt.sign({
  id: user.id,
  email: user.email,
  username: user.username
}, process.env.SECRET_KEY, { expiresIn: '1h' });
