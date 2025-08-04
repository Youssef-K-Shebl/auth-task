"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = require("./routes/authRoute");
// import { connectDatabase, sequelize } from "./config/database";
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello from TypeScript + Express!");
});
app.use("/auth", authRoute_1.router);
// connectDatabase()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to DB:", err);
//     process.exit(1);
//   });
// sequelize.sync().then(() => {
//   console.log("✅ All models were synchronized successfully.");
// });
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map