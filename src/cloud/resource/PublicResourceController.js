class PublicResourceController {
    static getResource(req, res) {
        res.send({ text: 'fromCloud public' });
    }
};

module.exports = {
    PublicResourceController
};
