import Joi from "joi";

export interface Car {
    manufacturer: string;
    model: string;
    year: number;
    price: number;
  }
  

const carSchema = Joi.object({
    manufacturer: Joi.string().min(2).max(50).required(),
    model: Joi.string().min(1).max(50).required(),
    year: Joi.number().integer().min(1886).max(new Date().getFullYear()).required(),
    price: Joi.number().min(0).required(),
  });
  
export const validateCar = (car: Car) => carSchema.validate(car);
  