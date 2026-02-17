import http, { request } from 'node:http';
import { json } from './utils/responses.js';
import { listUsers } from './users/users.controller.js';

// const listener = (request, response) => {
//   // response.writeHead(200, { 'Content-Type': 'text/plain' });
//   // response.end('Hello World!\n');

//   json(response, 200, {
//     message: 'API works!',
//   });
// };

const listener = (request, response) => {
  if (request.url === '/users') {
    return listUsers(request, response);
  }

  return json(response, 404, { message: 'Not Found' });
};

const server = http.createServer(listener);
server.listen(3000);

console.log('Server running at http://localhost:3000/');
