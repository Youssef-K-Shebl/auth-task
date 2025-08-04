"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("mysql://root:password@localhost:3306/auth");
const connectDatabase = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=database.js.map