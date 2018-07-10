const _ = require("lodash");
const { ClientType } = require('./ClientType');

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
        password: 'user1',
        type: ClientType.Types.USER
    }, {
        id: 2,
        name: 'user2',
        password: 'user2',
        type: ClientType.Types.USER
    }, {
        id: 3,
        name: 'backend',
        password: 'backend',
        type: ClientType.Types.SERVICE
    }, 
];

module.exports = { UserService };
