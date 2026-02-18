import { Router } from 'express';
import {
  handleCreateUser,
  handleListUsers,
  handleGetUserById,
} from './users.controller.js';

const router = Router();

// /users
router.post('/', handleCreateUser);
router.get('/', handleListUsers);
router.get('/:id', handleGetUserById);

export default router;
