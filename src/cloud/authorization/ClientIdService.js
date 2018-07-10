const { ClientType } = require('./ClientType');

class ClientIdService {
    static getClientType(id) {
        switch(id) {
            case "backend1":
            case "backend2":
                return ClientType.Types.SERVICE;
            default:
                return ClientType.Types.USER;
        }
    };

    static getClientAuthLevel(id) {
        switch(id) {
            case "backend1":
                return 1;
            case "backend2":
                return 2;
            default:
                return 0;
        }
    }
};

module.exports = {
    ClientIdService
}