const express = require('express');
const path = require('path');

class FrontendServerService {
    constructor(config) {
        this.config = config;
    }

    initializeServer() {
        const { secret, frontendPort: port } = this.config;
        const app = express();

        app.use(express.static(path.join(__dirname, 'assets')));
        app.use(express.static(path.join(__dirname, '../../node_modules')));

        app.listen(port, function () {
            console.info(`FRONTEND listening on port:\t\t${port}`);
        });

        return app;
    }
};

FrontendServerService.APP_ID = "frontend"

module.exports = {
    FrontendServerService
};
