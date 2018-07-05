const express = require('express');
const cors = require('cors');
const request = require('request');
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

        app.use(cors());
        
        app.get('/protected1', Resource1Controller.getResource);
        app.get('/protected2', Resource2Controller.getResource);
        // app.get('/authorize', AuthorizationController.authorize);
        app.get('/api/resource', (req, res) => {
            request(`http://localhost:${ this.config.cloudPort }/public`,{ json: true }, (err, response, body) => {
                if (err) {
                    throw err;
                } else {
                    res.json(body);
                }
            });
        });
        
        app.listen(port, function () {
            console.info(`BACKEND listening on port:\t\t${ port }`);
        });

        return app;
    }
}

module.exports = {
    BackendServerService
};
