const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => respondJSON(request, response, 200, { users });

const getUsersMeta = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end();
};

const notFound = (request, response) => {
  respondJSON(request, response, 404, {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  });
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404, {
    id: 'notFound',
  });
};

const addUser = (request, response, body) => {
  if (!body.name || !body.age) {
    return respondJSON(request, response, 400, {
      message: 'Name and age are both required.',
    });
  }

  if (users[body.name]) {
    users[body.name].age = body.age;
    return respondJSONMeta(request, response, 204);
  }

  users[body.name] = { name: body.name, age: body.age };
  return respondJSON(request, response, 201, { message: 'User created successfully' });
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
