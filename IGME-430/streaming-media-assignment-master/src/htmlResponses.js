const fs = require('fs');
const path = require('path');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getClient2 = (request, response) => {
  const file = path.resolve(__dirname, '../client/client2.html');
  fs.readFile(file, (err, content) => {
    if (err) {
      response.writeHead(500);
      response.end('Error loading client2.html');
      return;
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(content);
  });
};

const getClient3 = (request, response) => {
  const file = path.resolve(__dirname, '../client/client3.html');
  fs.readFile(file, (err, content) => {
    if (err) {
      response.writeHead(500);
      response.end('Error loading client3.html');
      return;
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(content);
  });
};

module.exports = {
  getIndex,
  getClient2,
  getClient3,
};
