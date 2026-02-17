import { fullName } from './old-name.js';

function hello() {
  let name = fullName('John', 'Doe');

  console.log('Hello World ' + name);
}

hello();
