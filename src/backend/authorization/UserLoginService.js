const jwt = require('jsonwebtoken');

const { HttpDao } = require('../services/HttpDao');
const { ConfigService } = require('../services/ConfigService');

class UserLoginService {
    static login(jwtOptions) {
        return function (req, res) {
            const AUTH_LEVEL = 1;

            if (req.body.name && req.body.password) {
                const { name, password } = req.body;

                HttpDao({
                    method: 'POST',
                    url: `http://localhost:${ConfigService.getConfig().cloudPort}/api/user_login`,
                    json: { name, password }
                }, (err, response, body) => {
                    if (response.statusCode === 200) {
                        console.info('BACKEND: Frontend authentication with the Cloud successful! Generating a BACKEND Token to deliver to the FRONTEND...');
                        const token = jwt.sign({ name }, jwtOptions.secretOrKey);
                        res.status(200).json({token});
                    } else {
                        res.status(401).send();
                    }
                }, AUTH_LEVEL);
            } else {
                res.status(400).send();
            }
        };

    }

};

module.exports = {
    UserLoginService
};
