"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cars_1 = require("./routes/cars");
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/cars", cars_1.carsRouter);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
