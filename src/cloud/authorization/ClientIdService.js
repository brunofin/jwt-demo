const { ClientType } = require('./ClientType');

class ClientIdService {
    static getClientType(id) {
        switch(id) {
            case "backend":
                return ClientType.Types.SERVICE;
        }
    }
};

module.exports = {
    ClientIdService
}