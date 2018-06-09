const axios = require('axios');
const qs = require('qs');

exports.handler = function(event, context, callback) {
  switch (event.httpMethod) {
    case 'GET':
      const { API_URL, API_ID, AFFILIATE_ID, SITE } = process.env;
      const API_PARAMS = qs.stringify(event.queryStringParameters);
      const URL = `${API_URL}ItemList?${API_PARAMS}&api_id=${API_ID}&affiliate_id=${AFFILIATE_ID}&site=${SITE}`;

      const respond = body => {
        callback(null, {
          statusCode: 200,
          body: body === '' ? body : JSON.stringify(body)
        });
      };

      axios
        .get(URL)
        .then(response => {
          console.log(response.data);
          respond(response.data);
        })
        .catch(err => {
          console.error(err);
          respond(err);
        });
      break;

    default:
      respond('');
      break;
  }
};
