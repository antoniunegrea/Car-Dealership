import express, { Request, Response } from "express";
import { Car, validateCar } from "../model/car";

const router = express.Router();

let cars: Car[] = [
    { manufacturer: "BMW", model: "E91", year: 2009, price: 5500 },
    { manufacturer: "BMW", model: "F30", year: 2015, price: 12000 },
    { manufacturer: "BMW", model: "X5", year: 2018, price: 25000 },
    { manufacturer: "BMW", model: "E46", year: 2003, price: 4500 },
    { manufacturer: "BMW", model: "G20", year: 2022, price: 35000 },
  
    { manufacturer: "Audi", model: "A4", year: 2021, price: 25000 },
    { manufacturer: "Audi", model: "A6", year: 2019, price: 32000 },
    { manufacturer: "Audi", model: "Q5", year: 2020, price: 30000 },
    { manufacturer: "Audi", model: "TT", year: 2016, price: 27000 },
  
    { manufacturer: "Dacia", model: "Logan", year: 2025, price: 20000 },
    { manufacturer: "Dacia", model: "Sandero", year: 2018, price: 11000 },
  
    { manufacturer: "Mercedes", model: "C-Class", year: 2018, price: 15000 },
    { manufacturer: "Mercedes", model: "E-Class", year: 2021, price: 40000 },
    { manufacturer: "Mercedes", model: "GLA", year: 2020, price: 28000 },
    { manufacturer: "Mercedes", model: "S-Class", year: 2015, price: 50000 },
  
    { manufacturer: "Toyota", model: "Corolla", year: 2015, price: 12000 },
    { manufacturer: "Toyota", model: "Camry", year: 2018, price: 18000 },
    { manufacturer: "Toyota", model: "Hilux", year: 2022, price: 35000 },
    { manufacturer: "Toyota", model: "Yaris", year: 2014, price: 9000 },
  
    { manufacturer: "Ford", model: "Focus", year: 2017, price: 10000 },
    { manufacturer: "Ford", model: "Mustang", year: 2021, price: 45000 },
    { manufacturer: "Ford", model: "F-150", year: 2023, price: 55000 },
    { manufacturer: "Ford", model: "Fiesta", year: 2012, price: 7000 },
  
    { manufacturer: "Volkswagen", model: "Golf", year: 2016, price: 14000 },
    { manufacturer: "Volkswagen", model: "Passat", year: 2019, price: 22000 },
    { manufacturer: "Volkswagen", model: "Tiguan", year: 2023, price: 33000 }
  ];
  

router.get("/", (req: Request, res: Response) => {
  res.json(cars);
});


router.post("/", (req: Request, res: Response) => {
    const { error } = validateCar(req.body);
    if (error && error.details) { // Ensure details exist
        res.status(400).json({ message: error.details[0].message });
    }
    const newCar: Car = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});
  

router.put("/:index", (req: Request, res: Response) => {
  const index = parseInt(req.params.index);

  if (isNaN(index)) {
    res.status(400).json({ message: "Invalid index parameter" });
  }

  if (index < 0 || index >= cars.length) {
    res.status(404).json({ message: "Car not found" });
  }

  const { error } = validateCar(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  cars[index] = req.body;
  res.json(cars[index]);
});

router.delete("/:index", (req: Request, res: Response) => {
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

export { router as carsRouter };