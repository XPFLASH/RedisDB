import express, { json } from 'express';
import { createClient } from 'redis';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// Conectar a Redis
const client = createClient({
  url: process.env.REDIS_SECRET_KEY,
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect().then(() => console.log('Conectado a Redis'));

// Endpoint para obtener todos los usuarios desde Redis
app.get('/api/get-all-users', async (req, res) => {
  try {
    // Obtener todas las claves que comienzan con "user:"
    const keys = await client.keys('user:*');
    
    // Obtener todos los detalles de los usuarios asociados a esas claves
    const users = await Promise.all(
      keys.map(async (key) => {
        const user = await client.hGetAll(key);
        return { key, ...user }; // Devolver los datos junto con la clave del usuario
      })
    );

    res.json(users);
  } catch (err) {
    console.error('Error al obtener los datos de los usuarios:', err);
    res.status(500).send('Error al obtener los datos de los usuarios');
  }
});

// Endpoint para registrar datos en Redis usando email como clave
app.post('/api/set-value', async (req, res) => {
  const { name, age, email, password, phone, country } = req.body;

  try {
    // Guarda los datos del usuario en un hash, usando el email como clave
    await client.hSet(`user:${email}`, {
      name,  // Asegurarte de que el nombre está almacenado
      age,
      password,  // Almacenar la contraseña
      phone,
      country,
    });
    res.status(200).json({ message: 'Registro exitoso' });
  } catch (err) {
    console.error('Error al registrar los datos:', err);
    res.status(500).send('Error al registrar los datos');
  }
});


// Endpoint para iniciar sesión (Login) usando JWT y email/password
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Obtener los datos del usuario por email
    const user = await client.hGetAll(`user:${email}`);

    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    if (!user.name) {
      return res.status(500).json({ message: 'El nombre del usuario no está registrado correctamente' });
    }

    const token = jwt.sign({ email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token, user });

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).send('Error al iniciar sesión');
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
