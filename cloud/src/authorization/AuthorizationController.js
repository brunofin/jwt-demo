class AuthorizationController {
    static authorize(req, res) {
        console.log('MOCK: AUTHORIZE');
        res.sendStatus(200);
    }
}

module.exports = {
    AuthorizationController
};
