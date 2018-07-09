const request = require('request');
const { CloudLoginService } = require('../authorization/CloudLoginService');

class Resource1Controller {
    static getResource(config) {
        return function (req, res) {
            request({
                method: 'GET',
                url: `http://localhost:${ config.cloudPort }/api/protected1`,
                headers: { 
                    Accept: 'application/json',
                    Bearer: CloudLoginService.TOKEN
                }
            }, (err, response, body) => {
                if (response.statusCode === 401) {
                    CloudLoginService.doLogin(config).then(() => {
                        Resource1Controller.getResource(config)(req, res);
                    });
                } else {
                    res.json(body);
                }
            });
        }
    }
}

module.exports = {
    Resource1Controller
}
