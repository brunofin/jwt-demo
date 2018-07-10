const { ConfigService } = require('../services/ConfigService');
const { HttpDao } = require('../services/HttpDao');

class ResourceLevel1Controller {
    static getResource(req, res) {
        const AUTH_LEVEL = 1;

        HttpDao({
            method: 'GET',
            url: `http://localhost:${ ConfigService.getConfig().cloudPort }/api/protected1`,
        },(err, response, body) => {
            res.json(body);
        }, AUTH_LEVEL);
    }
}

module.exports = {
    ResourceLevel1Controller
}
