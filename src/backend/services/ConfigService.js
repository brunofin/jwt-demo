class ConfigService { 
    static getConfig() {
        return ConfigService._config;
    };

    static setConfig(config) {
        ConfigService._config = config;
    };
};


ConfigService._config = null;

module.exports = {
    ConfigService
};
