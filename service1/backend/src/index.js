const express = require('express');
const jwt = require('express-jwt');

const { secret, port } = require('./config.json');

const app = express();

app.get('/api/authorize', (req, res) => {
    console.log('MOCK: /api/authorize');
    res.sendStatus(200);
});

app.listen(port, function () {
    console.info(`SERVICE1-SERVER listening on port ${port}.`);
});
