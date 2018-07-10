const request = require('request');

const { CloudLoginService } = require('../authorization/CloudLoginService');

module.exports = {
    HttpDao: function (options, callback) {
        if (!options.headers) {
            options.headers = {};
        }

        options.headers.Accept = 'application/json';
        options.headers.Authorization = `bearer ${CloudLoginService.TOKEN}`;

        return request(options, (err, response, body) => {
            if (response.statusCode === 401) {
                CloudLoginService.doLogin().then(() => {
                    options.headers.Authorization = `bearer ${CloudLoginService.TOKEN}`;
                    request(options, callback);
                });
            } else {
                callback(err, response, body);
            }
        });
    }
};