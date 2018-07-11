const { UserService } = require('./UserService');
const { ClientIdService } = require('./ClientIdService');
const { ClientType } = require('./ClientType');
const jwt = require('jsonwebtoken');

class AuthorizationController {
    static authorize(jwtOptions) {
        return function(req, res) {
            if (req.body.name && req.body.password && req.body.clientId) {
                const { name, password, clientId } = req.body;
                
                const user = UserService.findByName(name);
                
                if (!user) {
                    console.info(`CLOUD: No such user in the database.`);
                    res.status(404).json({ message: "no such user found" });
                }

                if (user.type !== ClientIdService.getClientType(clientId)) {
                    console.info(`CLOUD: This client does not allow logging in with that kind of user.`);
                    res.status(401).json({ message: "client did not match" });
                    return;
                }
                
                if (user.password === password) {
                    const payload = { id: user.id, level: ClientIdService.getClientAuthLevel(clientId) };
                    const token = jwt.sign(payload, jwtOptions.secretOrKey);
                    console.info(`CLOUD: Authenticating user ${user.name} and granting authorization level ${payload.level}`);
                    res.json({ message: "ok", token: token });
                } else {
                    res.status(401).json({ message: "passwords did not match" });
                }
            } else {
                res.status(400).send();
            }
        };
    };

    static authorizeUser(req, res) {
        if (req.body.name && req.body.password) {
            const { name, password } = req.body;
            const user = UserService.findByName(name);
            
            if (!user) {
                console.info(`CLOUD: No such user in the database.`);
                res.status(404).send();
            }

            if (user.type !== ClientType.Types.USER) {
                res.status(401).send();
            }
            
            if (user.password === password) {
                console.info(`CLOUD: Authenticating user ${user.name}`);
                res.status(200).send();

            } else {
                res.status(401).send();
            }
        } else {
            res.status(400).send();
        }
    }
};

module.exports = {
    AuthorizationController
};
