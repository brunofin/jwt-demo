const express = require('express');
const cors = require('cors');
const request = require('request');
const { ResourceLevel1Controller } = require('./resource/ResourceLevel1Controller');
const { Resource2Controller } = require('./resource/Resource2Controller');
const { ConfigService } = require('./services/ConfigService');

class BackendServerService {
    constructor(config) {
        ConfigService.setConfig(config);
    }

    initializeServer() {
        const { secret, backendPort:port } = ConfigService.getConfig();
        const app = express();

        app.use(cors());
        
        app.get('/api/protected1', ResourceLevel1Controller.getResource);
        app.get('/api/protected2', Resource2Controller.getResource);
        app.get('/api/resource', (req, res) => {
            request(`http://localhost:${ ConfigService.getConfig().cloudPort }/public`,{ json: true }, (err, response, body) => {
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
};

module.exports = {
    BackendServerService
};
