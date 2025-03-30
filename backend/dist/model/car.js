"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCar = void 0;
const joi_1 = __importDefault(require("joi"));
const carSchema = joi_1.default.object({
    manufacturer: joi_1.default.string().min(2).max(50).required(),
    model: joi_1.default.string().min(1).max(50).required(),
    year: joi_1.default.number().integer().min(1886).max(new Date().getFullYear()).required(),
    price: joi_1.default.number().min(0).required(),
});
const validateCar = (car) => carSchema.validate(car);
exports.validateCar = validateCar;
