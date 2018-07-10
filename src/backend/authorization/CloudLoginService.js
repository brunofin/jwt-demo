const request = require('request');
const { ConfigService } = require('../services/ConfigService');

class CloudLoginService {
    static doLevel1Login() {
        return CloudLoginService._doLogin({
            name: CloudLoginService.APP_USER,
            password: CloudLoginService.APP_PASSWORD,
            clientId: CloudLoginService.APP_ID_LEVEL_1
        });
    };

    static doLevel2Login() {
        return CloudLoginService._doLogin({
            name: CloudLoginService.APP_USER,
            password: CloudLoginService.APP_PASSWORD,
            clientId: CloudLoginService.APP_ID_LEVEL_2
        });
    };

    static doLogin(authLevel) {
        switch (authLevel) {
            case 1:
                return CloudLoginService.doLevel1Login();
            case 2:
                return CloudLoginService.doLevel2Login();
            default:
                throw new Error(`Unknown login level ${authLevel}`);
        }
    };

    static _doLogin(json) {
        return new Promise((resolve, reject) => {
            request({
                method: 'POST',
                url: `http://localhost:${ConfigService.getConfig().cloudPort}/api/login`,
                json
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
CloudLoginService.APP_ID_LEVEL_1 = "backend1";
CloudLoginService.APP_ID_LEVEL_2 = "backend2";
CloudLoginService.APP_USER = "backend";
CloudLoginService.APP_PASSWORD = "backend";

module.exports = {
    CloudLoginService
};
