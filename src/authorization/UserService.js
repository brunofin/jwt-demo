const _ = require("lodash");

class UserService {
    static findById(id) {
        return UserService.__users[_.findIndex(UserService.__users, { id })];
    };

    static findByName(name) {
        return UserService.__users[_.findIndex(UserService.__users, { name })];
    };
};

UserService.__users = [
    {
        id: 1,
        name: 'user1',
        password: 'user1'
    },
    {
        id: 2,
        name: 'user2',
        password: 'user2'
    }
];

module.exports = { UserService };
