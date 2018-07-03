const express = require('express');
const jwt = require('express-jwt');
const { Resource1Controller } = require('./resource/Resource1Controller');
const { Resource2Controller } = require('./resource/Resource2Controller');
const { AuthorizationController } = require('../authorization/AuthorizationController');

class BackendServerService {
    constructor(config) {
        this.config = config;
    }

    initializeServer() {
        const { secret, backendPort:port } = this.config;
        const app = express();
        
        app.get('/protected1', jwt({ secret }, Resource1Controller.getResource));
        app.get('/protected2', jwt({ secret }, Resource2Controller.getResource));
        app.get('/authorize', AuthorizationController.authorize);
        
        app.listen(port, function () {
            console.info(`BACKEND listening on port:\t\t${ port }`);
        });

        return app;
    }
}

module.exports = {
    BackendServerService
};
