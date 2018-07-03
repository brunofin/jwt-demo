const express = require('express');
const jwt = require('express-jwt');
const { Resource1Controller } = require('./resource/Resource1Controller');
const { Resource2Controller } = require('./resource/Resource2Controller');
const { AuthorizationController } = require('../authorization/AuthorizationController');

class CloudServerService {
    constructor(config) {
        this.config = config;
    }

    initializeServer() {
        const { secret, cloudPort:port } = this.config;
        const app = express();
        
        app.get('/protected1', jwt({ secret }, Resource1Controller.getResource));
        app.get('/protected2', jwt({ secret }, Resource2Controller.getResource));
        app.get('/authorize', AuthorizationController.authorize);
        
        app.listen(port, function () {
            console.info(`CLOUD listening on port:\t\t${ port }`);
        });

        return app;
    }
}

module.exports = {
    CloudServerService
};
