import "./styles.css"
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

function Operations({carsList, setCarsList})
{

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = id !== undefined;
    const carToEdit = isEditing ? carsList[parseInt(id)] : { manufacturer: "", model: "", year: "", price: "" };


    const [manufacturer, setManufacturer] = useState(carToEdit?.manufacturer || "");
    const [model, setModel] = useState(carToEdit?.model || "");
    const [year, setYear] = useState(carToEdit?.year || "");
    const [price, setPrice] = useState(carToEdit?.price || "");

    const [errors, setErrors] = useState({ manufacturer: '', model: '', year: '' , price: ''});

    const validateData = () =>{
      let newErrors = {manufacturer: '', model: '', year: '', price: ''};

      if(manufacturer.length < 2)
      {
        newErrors.manufacturer = "Manufacturer must have at least 2 characters";
      }

      if(model.length < 2)
      {
        newErrors.model = "Model must have at least 2 characters";
      }

      if(year < 0 || year > new Date().getFullYear())
      {
        newErrors.year = "Year must be positive and not from the future :))";
      }

      if(price < 0)
      {
        newErrors.price = "Price must be positive";
      }

      setErrors(newErrors);

      return Object.values(newErrors).every((error) => error === '');
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      const newCar = {manufacturer, model, year, price}; 
      if (validateData()) {
        if (isEditing) {
          const updatedCars = [...carsList];
          updatedCars[parseInt(id)] = newCar;
          setCarsList(updatedCars);
          alert("Car updated successfully!");
        } 
        else {
          setCarsList([...carsList, newCar]);
          alert("Car added successfully!");
        }
      }
      else{
        alert("Correct the errors!")
      }
    }

    return (
        <div>
          <h1>{isEditing ? "Edit Car" : "Car"}</h1>
          <button onClick={() => navigate("/")}>Go Back Home</button>
          
          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
              <input
                  type="text"
                  placeholder="Manufacturer"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  required
              />
              <div className="errors">
                {errors.manufacturer}
              </div>
              <input
                  type="text"
                  placeholder="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
              />
              <div className="errors">
                {errors.model}
              </div>
              <input
                  type="number"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
              />
              <div className="errors">
                {errors.year}
              </div>
              <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
              />
              <div className="errors">
                {errors.price}
              </div>
              <button type="submit">{isEditing ? "Edit Car" : "Add Car"}</button>
          </form>
          
        </div>
    );
}

export default Operations;