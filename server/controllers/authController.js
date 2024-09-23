// controllers/authController.js
import client from '../models/faunaClient.js';
import { fql } from 'fauna';
import jwt from 'jsonwebtoken';

export const loginUser = async (email, password) => {
  const query = fql`
    users.all() {
      name,
      email,
      password
    }
  `;
  const result = await client.query(query);
  const users = result.data.data;
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  if (password !== user.password) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};
