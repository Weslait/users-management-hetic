import { createUser, findUserByEmail } from './users.service.js';
import { validateUser } from './users.validation.js';

export async function handleCreateUser(req, res) {
  try {
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
    // Create user
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Toujours se poser la question : l'erreur vient de qui ?
// En fonction de la réponse, on choisit notre code d'erreur
// Erreur 409 => "conflict" / Dans notre cas, il y a déjà un utilisateur qui utilise cet email

//Important : Si on maîtrise cette partie du CRUD, on peut demander à l'IA de reprendre notre flow pour créer n'importe quel CRUD
