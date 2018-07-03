const { CloudServerService } = require('./cloud/CloudServerService');
const { BackendServerService } = require('./backend/BackendServerService');
const config = require('./config.json');

const cloud = new CloudServerService(config);
cloud.initializeServer();

const backend = new BackendServerService(config);
backend.initializeServer();