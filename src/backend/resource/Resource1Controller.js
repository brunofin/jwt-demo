const { ConfigService } = require('../services/ConfigService');
const { HttpDao } = require('../services/HttpDao');

class Resource1Controller {
    static getResource(req, res) {
        HttpDao({
            method: 'GET',
            url: `http://localhost:${ ConfigService.getConfig().cloudPort }/api/protected1`,
        },(err, response, body) => {
            res.json(body);
        });
    }
}

module.exports = {
    Resource1Controller
}
