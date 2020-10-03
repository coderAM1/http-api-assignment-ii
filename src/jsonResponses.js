// Note this object is purely in memory
const users = {};
const aetherParties = {};
const primalParties = {};
const crystalParties = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

const getAether = (request, response) => {
  const responseJSON = {
    aetherParties,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getPrimal = (request, response) => {
  const responseJSON = {
    primalParties,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getCrystal = (request, response) => {
  const responseJSON = {
    crystalParties,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const addParty = (request, response, body) => {
  const responseJSON = {
    message: 'Need to fill out username and minItemLevel',
  };

  if (!body.name || !body.server || !body.content || !body.minItemLevel) {
    responseJSON.id = 'missingParams';
    console.log(body.name);
    console.log(body.server);
    console.log(body.content);
    console.log(body.minItemLevel);
    
    return respondJSON(request, response, 400, responseJSON); // 400=bad request
  }
  // we DID get a name and age
  let responseCode = 201;
  if(body.server === '/aether'){
    if (aetherParties[body.name]) {
      responseCode = 204;
    } else {
      aetherParties[body.name] = {};
    }
    // update or initialize values, as the case may be
    aetherParties[body.name].name = body.name;
    aetherParties[body.name].content = body.content;
    aetherParties[body.name].minItemLevel = body.minItemLevel;
  }else if(body.server === '/primal'){
    if (primalParties[body.name]) {
      responseCode = 204;
    } else {
      primalParties[body.name] = {};
    }
    // update or initialize values, as the case may be
    primalParties[body.name].name = body.name;
    primalParties[body.name].content = body.content;
    primalParties[body.name].minItemLevel = body.minItemLevel;
  }else{
    if (crystalParties[body.name]) {
      responseCode = 204;
    } else {
      crystalParties[body.name] = {};
    }
    // update or initialize values, as the case may be
    crystalParties[body.name].name = body.name;
    crystalParties[body.name].content = body.content;
    crystalParties[body.name].minItemLevel = body.minItemLevel;
  }

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getAether,
  getCrystal,
  getPrimal,
  getUsersMeta,
  notFound,
  notFoundMeta,
  addParty,
};
