const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styleSheet = fs.readFileSync(`${__dirname}/../client/style.css`);

const getResponse = (request, response, type, item) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(item);
  response.end();
};

const getIndex = (request, response) => {
  getResponse(request, response, 'text/html', index);
};

const getCSS = (request, response) => {
  getResponse(request, response, 'text/css', styleSheet);
};

module.exports = {
  getIndex,
  getCSS,
};
