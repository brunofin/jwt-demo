class Resource1Controller {
    static getResource(req, res) {
        res.json({ text: 'fromCloud with AUTH res1' });
    }
}

module.exports = {
    Resource1Controller
};
