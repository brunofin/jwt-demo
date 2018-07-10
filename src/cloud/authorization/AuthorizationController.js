const { UserService } = require('./UserService');
const { ClientIdService } = require('./ClientIdService');
const jwt = require('jsonwebtoken');

class AuthorizationController {
    static authorize(jwtOptions) {
        return function(req, res) {
            if (req.body.name && req.body.password && req.body.clientId) {
                const { name, password, clientId } = req.body;
                
                const user = UserService.findByName(name);
                
                if (!user) {
                    res.status(404).json({ message: "no such user found" });
                }

                if (user.type !== ClientIdService.getClientType(clientId)) {
                    res.status(401).json({ message: "client did not match" });
                    return;
                }
                
                if (user.password === password) {
                    const payload = { id: user.id, level: ClientIdService.getClientAuthLevel(clientId) };
                    const token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.json({ message: "ok", token: token });
                } else {
                    res.status(401).json({ message: "passwords did not match" });
                }
            } else {
                res.status(400).send();
            }
        };
    };
};

module.exports = {
    AuthorizationController
};
