class Resource2Controller {
    static getResource(req, res, next) {
        res.send({ text: 'fromCloud with AUTH res2' });
    }
}

module.exports = {
    Resource2Controller
};
