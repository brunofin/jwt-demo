const request = require('request');
const { ConfigService } = require('../services/ConfigService');

class PublicResourceController {
    static getResource(req, res) {
        request({
            method: 'GET',
            url: `http://localhost:${ ConfigService.getConfig().cloudPort }/api/public`,
        },(err, response, body) => {
            res.send(body);
        });
    }
};

module.exports = {
    PublicResourceController
};
