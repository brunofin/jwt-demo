class Resource2Controller {
    static getResource(req, res, next) {
        console.log(req, res);
        next();
    }
}

module.exports = {
    Resource2Controller
}
