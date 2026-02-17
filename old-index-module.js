import http from 'node:http';

const listener = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World\n');
};

const server = http.createServer(listener);
server.listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
