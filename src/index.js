const { CloudServerService } = require('./cloud/CloudServerService');
const { BackendServerService } = require('./backend/BackendServerService');
const { FrontendServerService } = require('./frontend/FrontendServerService');
const config = require('./config.json');

const servers = [
    new CloudServerService(config),
    new BackendServerService(config),
    new FrontendServerService(config)
];

servers.forEach(server => {
    try {
        server.initializeServer()
    } catch (e) {
        console.error(e);
        throw e;
    }
});
