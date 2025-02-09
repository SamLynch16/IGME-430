const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

// Serve static files (like CSS, images, etc.) from the client folder
app.use(express.static(path.join(__dirname, 'client')));

// Serve the home page (client page) when visiting the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'client.html')); // Updated path to point to the client folder
});

// Server routes to handle the different statuses and query parameters
app.get('/success', (req, res) => {
  handleResponse(req, res, 200, { message: 'Success' });
});

app.get('/badRequest', (req, res) => {
  const isValid = req.query.valid === 'true';
  if (isValid) {
    handleResponse(req, res, 200, { message: 'Bad request (valid=true)' });
  } else {
    handleResponse(req, res, 400, { message: 'Message: Missing valid query parameter set to true' });
  }
});

app.get('/unauthorized', (req, res) => {
  const isLoggedIn = req.query.loggedIn === 'yes';
  if (isLoggedIn) {
    handleResponse(req, res, 200, { message: 'Authorized' });
  } else {
    handleResponse(req, res, 401, { message: 'Message: Unauthorized access, login required' });
  }
});

app.get('/forbidden', (req, res) => {
  handleResponse(req, res, 403, { message: 'Message: Forbidden access' });
});

app.get('/internal', (req, res) => {
  handleResponse(req, res, 500, { message: 'Message: Internal Server Error' });
});

app.get('/notImplemented', (req, res) => {
  handleResponse(req, res, 501, { message: 'Message: Not Implemented' });
});

app.get('/notFound', (req, res) => {
  handleResponse(req, res, 404, { message: 'Message: Page Not Found' });
});

// Catch-all route for undefined pages
app.get('*', (req, res) => {
  handleResponse(req, res, 404, { message: 'Message: Page Not Found' });
});

// Function to handle the response format (JSON or XML)
function handleResponse(req, res, statusCode, responseContent) {
    const acceptHeader = req.get('Accept') || 'application/json'; // Default to JSON if no Accept header is provided
  
    // Check if the Accept header is for JSON or XML
    if (acceptHeader.includes('application/json')) {
      res.status(statusCode).json(responseContent); // Send JSON response
    } else if (acceptHeader.includes('text/xml')) {
      res.status(statusCode).type('application/xml').send(convertToXML(responseContent, statusCode)); // Send XML response
    } else {
      res.status(406).send('Not Acceptable'); // If the Accept header is not JSON or XML, return a 406 error
    }
}

// Function to convert JSON object to XML format
function convertToXML(obj, statusCode) {
  const escapeXML = (str) => str.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  })[char]);

  let xml = `<response><message>${escapeXML(obj.message)}</message>`;
  if (statusCode >= 400) {
    xml += `<id>${statusCode}</id>`;  // Add error code for failures
  }
  xml += `</response>`;
  return xml;
}

// Start the server
app.listen(port, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
