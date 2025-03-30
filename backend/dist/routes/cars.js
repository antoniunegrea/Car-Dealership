"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRouter = void 0;
const express_1 = __importDefault(require("express"));
const car_1 = require("../model/car");
const router = express_1.default.Router();
exports.carsRouter = router;
let cars = [
    { manufacturer: "BMW", model: "E91", year: 2009, price: 5500 },
    { manufacturer: "Audi", model: "A4", year: 2021, price: 2500 },
    { manufacturer: "Dacia", model: "Logan", year: 2025, price: 20000 },
    { manufacturer: "Mercedes", model: "C-Class", year: 2018, price: 15000 },
    { manufacturer: "Toyota", model: "Corolla", year: 2015, price: 12000 },
];
router.get("/", (req, res) => {
    res.json(cars);
});
router.post("/", (req, res) => {
    const { error } = (0, car_1.validateCar)(req.body);
    if (error && error.details) { // Ensure details exist
        res.status(400).json({ message: error.details[0].message });
    }
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});
router.put("/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index)) {
        res.status(400).json({ message: "Invalid index parameter" });
    }
    if (index < 0 || index >= cars.length) {
        res.status(404).json({ message: "Car not found" });
    }
    const { error } = (0, car_1.validateCar)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    cars[index] = req.body;
    res.json(cars[index]);
});
router.delete("/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index)) {
        res.status(400).json({ message: "Invalid index parameter" });
    }
    if (index < 0 || index >= cars.length) {
        res.status(404).json({ message: "Car not found" });
    }
    const deletedCar = cars.splice(index, 1);
    res.json({ message: "Car deleted successfully", deletedCar });
});
