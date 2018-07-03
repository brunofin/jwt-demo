class Resource1Controller {
    static getResource(req, res, next) {
        console.log(req, res);
        next();
    }
}

module.exports = {
    Resource1Controller
}
