// routes/userRoutes.js
import express from 'express';
import { addUser, getUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const result = await addUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const result = await getUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
