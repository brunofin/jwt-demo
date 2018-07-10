const request = require('request');
const { ConfigService } = require('../services/ConfigService');

class CloudLoginService {
    static doLogin() {
        return new Promise((resolve, reject) => {
            request({
                method: 'POST',
                url: `http://localhost:${ ConfigService.getConfig().cloudPort }/api/login`,
                json: {
                    name: CloudLoginService.APP_USER,
                    password: CloudLoginService.APP_PASSWORD,
                    clientId: CloudLoginService.APP_ID
                }
            }, (error, response, body) => {
                if (error) {
                    console.error(error);
                }
                if (response.statusCode === 200) {
                    CloudLoginService.TOKEN = body.token;
                    resolve(CloudLoginService.TOKEN);
                } else {
                    reject(body.statusCode)
                }
            });
        });
    }
};

CloudLoginService.TOKEN = null;
CloudLoginService.APP_ID = "backend";
CloudLoginService.APP_USER = "backend";
CloudLoginService.APP_PASSWORD = "backend";

module.exports = {
    CloudLoginService
};
