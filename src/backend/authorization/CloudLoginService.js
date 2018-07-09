const request = require('request');

class CloudLoginService {
    static doLogin(config) {
        return new Promise((resolve, reject) => {
            request({
                method: 'POST',
                url: `http://localhost:${config.cloudPort}/api/login`,
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
