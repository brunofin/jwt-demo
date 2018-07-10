class Resource1Controller {
    static getResource(req, res) {
        res.json({ name: 'fromCloud with AUTH' });
    }
}

module.exports = {
    Resource1Controller
}
