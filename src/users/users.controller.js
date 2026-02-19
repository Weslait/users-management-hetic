import {
  createUser,
  findUserByEmail,
  listUsers,
  getUsersById,
  deleteUser,
  updateUser,
} from './users.service.js';
import { validateUser, validateUpdateUser } from './users.validation.js';

export async function handleCreateUser(req, res) {
  try {
    // Apply trim and lowercase
    if (req.body.email) {
      req.body.email = req.body.email.trim();
      req.body.email = req.body.email.toLowerCase();
    }
    const result = validateUser(req.body);

    if (!result.ok) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: result.errors,
      });
    }

    // Check if user already exist
    const existingUser = await findUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    //ici ?
    // Create user
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleListUsers(req, res) {
  try {
    const users = await listUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleGetUserById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Missing user ID' });
    }

    const user = await getUsersById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
export async function handleDeleteUser(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Missing user ID' });
    }

    const user = await getUsersById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await deleteUser(id);

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleUpdateUser(req, res) {
  try {
    // Apply trim and lowercase
    if (req.body.email) {
      req.body.email = req.body.email.trim();
      req.body.email = req.body.email.toLowerCase();
    }

    // Check if user ID exist
    const { id } = req.params;
    const { email } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Missing user ID' });
    }

    // Verify is user ID exist
    const user = await getUsersById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email already exist
    if (email) {
      const existingEmail = await findUserByEmail(req.body.email);
      if (existingEmail && existingEmail.id !== id) {
        return res.status(409).json({ message: 'Email already in use' });
      }
    }

    const results = validateUpdateUser(req.body);
    if (!results.ok) {
      return res.status(400).json({
        error: 'Validation error',
        fields: results.errors,
      });
    }

    const updatedUser = await updateUser(id, results.data);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleSearchByEmail(req, res) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        error: 'Email query parameter is required',
      });
    }

    const user = await findUserByEmail(email);
    if (user !== null) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Toujours se poser la question : l'erreur vient de qui ?
// En fonction de la réponse, on choisit notre code d'erreur
// Erreur 409 => "conflict" / Dans notre cas, il y a déjà un utilisateur qui utilise cet email

//Important : Si on maîtrise cette partie du CRUD, on peut demander à l'IA de reprendre notre flow pour créer n'importe quel CRUD
