const fs = require('fs');
const path = require('path');

const clientPage = fs.readFileSync(path.join(__dirname, '../client/client.html'));
const cssStyles = fs.readFileSync(path.join(__dirname, '../client/style.css'));

const getClientPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(clientPage);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssStyles);
  response.end();
};

module.exports = {
  getClientPage,
  getCSS,
};
