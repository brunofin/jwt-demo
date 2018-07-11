const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const Passport = require("passport").Passport;
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const { ResourceLevel1Controller } = require('./resource/ResourceLevel1Controller');
const { ResourceLevel2Controller } = require('./resource/ResourceLevel2Controller');
const { PublicResourceController } = require('./resource/PublicResourceController');
const { UserLoginService } = require('./authorization/UserLoginService');
const { ConfigService } = require('./services/ConfigService');
const { UserService } = require('../cloud/authorization/UserService');

class BackendServerService {
    constructor(config) {
        ConfigService.setConfig(config);
    }

    initializeServer() {
        const { secret, backendPort:port } = ConfigService.getConfig();
        const app = express();

        const jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer'),
            secretOrKey: secret
        };

        const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            const user = UserService.findById(jwt_payload.id) || UserService.findByName(jwt_payload.name);
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });

        const passport = new Passport();

        passport.use(strategy);

        app.use(cors());
        app.use(passport.initialize());
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        
        app.post('/api/login', UserLoginService.login(jwtOptions));

        app.get('/api/protected1', passport.authenticate('jwt', { session: false }), ResourceLevel1Controller.getResource);
        app.get('/api/protected2', passport.authenticate('jwt', { session: false }), ResourceLevel2Controller.getResource);

        app.get('/api/public', PublicResourceController.getResource);

        
        app.listen(port, function () {
            console.info(`BACKEND listening on port:\t\t${ port }`);
        });

        return app;
    }
};

module.exports = {
    BackendServerService
};
