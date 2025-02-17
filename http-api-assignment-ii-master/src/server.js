const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlResponses = require('./htmlResponses');
const jsonResponses = require('./jsonResponses');

const port = process.env.PORT || 3000;

const handlePost = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (parsedUrl.pathname === '/addUser') {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      const parsedBody = query.parse(body);
      jsonResponses.addUser(request, response, parsedBody);
    });
  }
};

const handleRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/client.html') {
    return htmlResponses.getClientPage(request, response);
  }

  if (parsedUrl.pathname === '/style.css') {
    return htmlResponses.getCSS(request, response);
  }

  if (parsedUrl.pathname === '/getUsers') {
    if (request.method === 'GET') return jsonResponses.getUsers(request, response);
    if (request.method === 'HEAD') return jsonResponses.getUsersMeta(request, response);
  }

  if (parsedUrl.pathname === '/notReal') {
    if (request.method === 'GET') return jsonResponses.notFound(request, response);
    if (request.method === 'HEAD') return jsonResponses.notFoundMeta(request, response);
  }

  if (request.method === 'POST') {
    return handlePost(request, response);
  }

  return jsonResponses.notFound(request, response);
};

const server = http.createServer(handleRequest);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
