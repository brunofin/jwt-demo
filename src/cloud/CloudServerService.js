const express = require('express');
const bodyParser = require("body-parser");
const Passport = require("passport").Passport;
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const { Resource1Controller } = require('./resource/Resource1Controller');
const { Resource2Controller } = require('./resource/Resource2Controller');
const { PublicResourceController } = require('./resource/PublicResourceController');
const { AuthorizationController } = require('./authorization/AuthorizationController');
const { UserService } = require('./authorization/UserService');
class CloudServerService {
    constructor(config) {
        this.config = config;
    }

    userLevelCheck(requiredAuthenticationLevel, route) {
        return function(req, res) {
            if (req.user.level >= requiredAuthenticationLevel) {
                console.info(`CLOUD: Client is authenticated and has authorization level equal or greater than the required. Needed: ${requiredAuthenticationLevel}; Got: ${req.user.level}. OK, Continuing...`);
                route.apply(this, arguments);
            } else {
                console.info(`CLOUD: Client is authenticated but does not have enough authorization level to access this resource. Level needed: ${requiredAuthenticationLevel}; Got: ${req.user.level}.`);
                res.status(401).json({ message: "client authentication level not match" });
            }
        }
    };

    initializeServer() {
        const { secret, cloudPort: port } = this.config;

        const jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer'),
            secretOrKey: secret
        };

        const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            const user = Object.assign({},
                UserService.findById(jwt_payload.id),
                { level: jwt_payload.level }
            );
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });

        const passport = new Passport();

        passport.use(strategy);

        const app = express();
        app.use(passport.initialize());
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.post("/api/login", AuthorizationController.authorize(jwtOptions));
        app.post("/api/user_login", passport.authenticate('jwt', { session: false }), AuthorizationController.authorizeUser);
        
        app.get('/api/protected1', passport.authenticate('jwt', { session: false }), this.userLevelCheck(1, Resource1Controller.getResource));
        app.get('/api/protected2', passport.authenticate('jwt', { session: false }), this.userLevelCheck(2, Resource2Controller.getResource));
        
        app.get('/api/public', PublicResourceController.getResource);

        app.listen(port, function () {
            console.info(`CLOUD listening on port:\t\t${port}`);
        });

        return app;
    }
}

module.exports = {
    CloudServerService
};
