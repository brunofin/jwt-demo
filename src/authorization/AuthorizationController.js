const { UserService } = require('./UserService');

class AuthorizationController {
    static authorize(jwtOptions) {
        return function(req, res) {
            if (req.body.name && req.body.password) {
                const name = req.body.name;
                const password = req.body.password;
                
                const user = UserService.findByName(name);
                
                if (!user) {
                    res.status(401).json({ message: "no such user found" });
                }
                
                if (user.password === password) {
                    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                    const payload = { id: user.id };
                    const token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.json({ message: "ok", token: token });
                } else {
                    res.status(401).json({ message: "passwords did not match" });
                }
            }
        }
    }
}

module.exports = {
    AuthorizationController
};
