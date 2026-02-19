import { Router } from 'express';
import {
  handleCreateUser,
  handleListUsers,
  handleGetUserById,
  handleDeleteUser,
  handleUpdateUser,
  handleSearchByEmail,
} from './users.controller.js';

const router = Router();

// /users
router.post('/', handleCreateUser);
router.get('/', handleListUsers);
router.get('/search', handleSearchByEmail);
router.get('/:id', handleGetUserById);
router.delete('/:id', handleDeleteUser);
router.patch('/:id', handleUpdateUser);

export default router;
