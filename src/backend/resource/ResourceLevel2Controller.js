const { ConfigService } = require('../services/ConfigService');
const { HttpDao } = require('../services/HttpDao');

class ResourceLevel2Controller {
    static getResource(req, res) {
        const AUTH_LEVEL = 2;

        HttpDao({
            method: 'GET',
            url: `http://localhost:${ ConfigService.getConfig().cloudPort }/api/protected2`,
        },(err, response, body) => {
            res.json(body);
        }, AUTH_LEVEL);
    }
}

module.exports = {
    ResourceLevel2Controller
}
