const express = require('express');
const cors = require('cors');
const request = require('request');
const { ResourceLevel1Controller } = require('./resource/ResourceLevel1Controller');
const { ResourceLevel2Controller } = require('./resource/ResourceLevel2Controller');
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
        app.get('/api/protected2', ResourceLevel2Controller.getResource);
        
        app.listen(port, function () {
            console.info(`BACKEND listening on port:\t\t${ port }`);
        });

        return app;
    }
};

module.exports = {
    BackendServerService
};
