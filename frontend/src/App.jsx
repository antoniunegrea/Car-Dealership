import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";
import Operations from "./Operations";
import Charts from "./Charts";
import { BrowserRouter as Router, Route, Routes } from "react-router";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/cars").then((res) => setCars(res.data));
  }, []);

  const addCar = (car) => {
    axios.post("http://localhost:5000/api/cars", car).then((res) => {
      setCars([...cars, res.data]);
      alert("Car added successfully!");
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("An unexpected error occurred while adding the car.");
      }
    });
  };

  const editCar = (index, updatedCar) => {
    axios.put(`http://localhost:5000/api/cars/${index}`, updatedCar).then((res) => {
      const updatedCars = [...cars];
      updatedCars[index] = res.data;
      setCars(updatedCars);
      alert("Car updated successfully!");
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("An unexpected error occurred while editing the car.");
      }
    });
  };

  const deleteCar = (index) => {
    axios.delete(`http://localhost:5000/api/cars/${index}`).then(() => {
      setCars(cars.filter((_, i) => i !== index));
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("An unexpected error occurred while deleting the car.");
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home carsList={cars} setCarsList={setCars} deleteCar={deleteCar} />} />
        <Route path="/operations" element={<Operations carsList={cars} setCarsList={addCar} />} />
        <Route path="/operations/:id" element={<Operations carsList={cars} setCarsList={editCar} />} />
        <Route path="/charts" element={<Charts carsList={cars} />} />
      </Routes>
    </Router>
  );
}

export default App;
