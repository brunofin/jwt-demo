const request = require('request');

const { CloudLoginService } = require('../authorization/CloudLoginService');

module.exports = {
    HttpDao: function (options, callback, authLevel) {
        if (!options.headers) {
            options.headers = {};
        }

        options.headers.Accept = 'application/json';
        options.headers.Authorization = `bearer ${CloudLoginService.TOKEN}`;

        return request(options, (err, response, body) => {
            if (response.statusCode === 401) {
                CloudLoginService.doLogin(authLevel).then(() => {
                    console.info(`BACKEND: Authorization level upped to ${authLevel}`);
                    options.headers.Authorization = `bearer ${CloudLoginService.TOKEN}`;
                    request(options, callback);
                });
            } else {
                callback(err, response, body);
            }
        });
    }
};
