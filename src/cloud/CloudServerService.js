const express = require('express');
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const { Resource1Controller } = require('./resource/Resource1Controller');
const { Resource2Controller } = require('./resource/Resource2Controller');
const { AuthorizationController } = require('./authorization/AuthorizationController');
const { UserService } = require('./authorization/UserService');
class CloudServerService {
    constructor(config) {
        this.config = config;
    }

    initializeServer() {
        const { secret, cloudPort: port } = this.config;

        const jwtOptions = {}
        jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
        jwtOptions.secretOrKey = secret;

        const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            console.log('payload received', jwt_payload);
            const user = UserService.findById(jwt_payload.id);
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });

        passport.use(strategy);

        const app = express();
        app.use(passport.initialize());
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.post("/api/login", AuthorizationController.authorize(jwtOptions));
        app.get('/api/protected1', passport.authenticate('jwt', { session: false }), Resource1Controller.getResource);
        app.get('/api/protected2', passport.authenticate('jwt', { session: false }), Resource2Controller.getResource);
        app.get('/api/public', function(req, res) {
            res.json({ name: 'fromCloud' });
        });

        app.listen(port, function () {
            console.info(`CLOUD listening on port:\t\t${port}`);
        });

        return app;
    }
}

module.exports = {
    CloudServerService
};
