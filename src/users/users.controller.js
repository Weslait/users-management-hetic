import { getUsers } from './users.service.js';
import { json } from '../utils/responses.js';

export function listUsers(request, response) {
  if (request.method !== 'GET') {
    return json(response, 405, { message: 'Method Not Allowed' });
  }

  const users = getUsers();
  return json(response, 200, { data: users });
}
