// controllers/userController.js

import { fql } from 'fauna';
import client from '../models/faunaClient.js';

export const addUser = async (userData) => {
  const query = fql`
    users.create({
      name: ${userData.name},
      age: ${userData.age},
      email: ${userData.email},
      password: ${userData.password},
      phone: ${userData.phone},
      country: ${userData.country}
    })
  `;
  const result = await client.query(query)
  return result;
};

export const getUsers = async () => {
  const query = fql`
    users.all() {
      name,
      age,
      email,
      password,
      phone,
      country
    }
  `;
  const result = await client.query(query)
  return result;
};
