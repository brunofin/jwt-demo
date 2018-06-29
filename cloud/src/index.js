const express = require('express');
const jwt = require('express-jwt');

const { secret, port } = require('./config.json');
const { Resource1Controller } = require('./resource/Resource1Controller');
const { Resource2Controller } = require('./resource/Resource2Controller');
const { AuthorizationController } = require('./authorization/AuthorizationController');

const app = express();

app.get('/protected1', jwt({ secret }, Resource1Controller.getResource));
app.get('/protected2', jwt({ secret }, Resource2Controller.getResource));
app.get('/authorize', AuthorizationController.authorize);

app.listen(port, function () {
    console.info(`CLOUD listening on port ${port}.`);
});
