import "./styles.css"
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useState } from "react";
import Home from "./Home"
import Operations from "./Operations";
import Charts from "./Charts";


const initialCarsList = [
  { manufacturer: "BMW", model: "E91", year: 2009, price: 5500 },
  { manufacturer: "Audi", model: "A4", year: 2021, price: 2500 },
  { manufacturer: "Dacia", model: "Logan", year: 2025, price: 20000 },
  { manufacturer: "Mercedes", model: "C-Class", year: 2018, price: 15000 },
  { manufacturer: "Toyota", model: "Corolla", year: 2015, price: 12000 },
  { manufacturer: "Ford", model: "Focus", year: 2012, price: 8000 },
  { manufacturer: "Volkswagen", model: "Golf", year: 2019, price: 14000 },
  { manufacturer: "Tesla", model: "Model 3", year: 2023, price: 35000 },
  { manufacturer: "Hyundai", model: "Elantra", year: 2020, price: 18000 },
  { manufacturer: "Kia", model: "Sportage", year: 2017, price: 16000 },
  { manufacturer: "Chevrolet", model: "Cruze", year: 2014, price: 9000 },
  { manufacturer: "Nissan", model: "Altima", year: 2016, price: 11000 },
  { manufacturer: "Honda", model: "Civic", year: 2022, price: 25000 },
  { manufacturer: "Mazda", model: "CX-5", year: 2021, price: 27000 },
  { manufacturer: "Subaru", model: "Outback", year: 2019, price: 22000 },
  { manufacturer: "BMW", model: "X5", year: 2017, price: 28000 },
  { manufacturer: "BMW", model: "X5", year: 2017, price: 28000 },
  { manufacturer: "BMW", model: "X5", year: 2019, price: 40000 },
  { manufacturer: "Audi", model: "Q5", year: 2015, price: 24000 },
  { manufacturer: "Toyota", model: "Camry", year: 2019, price: 23000 },
  { manufacturer: "Ford", model: "Mustang", year: 2021, price: 40000 },
  { manufacturer: "Volkswagen", model: "Passat", year: 2015, price: 15000 },
  { manufacturer: "Tesla", model: "Model Y", year: 2023, price: 45000 },
  { manufacturer: "Hyundai", model: "Tucson", year: 2018, price: 20000 },
  { manufacturer: "Kia", model: "Optima", year: 2020, price: 21000 },
  { manufacturer: "Chevrolet", model: "Malibu", year: 2016, price: 14000 },
  { manufacturer: "Nissan", model: "Sentra", year: 2012, price: 8000 },
  { manufacturer: "Honda", model: "Accord", year: 2015, price: 19000 },
  { manufacturer: "Mazda", model: "Mazda3", year: 2022, price: 23000 },
  { manufacturer: "Subaru", model: "Impreza", year: 2020, price: 21000 }
];

function App({ carsList, setCars }) {
  const [cars, setCarsState] = useState(carsList || initialCarsList);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home carsList={cars} setCarsList={setCars || setCarsState} />} />
        <Route path="/operations" element={<Operations carsList={cars} setCarsList={setCars || setCarsState} />} />
        <Route path="/operations/:id" element={<Operations carsList={cars} setCarsList={setCars || setCarsState} />} />
        <Route path="/charts" element={<Charts carsList={cars} />} />
      </Routes>
    </Router>
  );
}

export default App;
