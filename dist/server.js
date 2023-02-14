"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
(async () => {
    try {
        await config_1.dataSource.initialize();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        config_1.app.listen(config_1.PORT, () => console.log(config_1.PORT));
    }
})();
