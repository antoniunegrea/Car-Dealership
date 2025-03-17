import "./styles.css"
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

{/* TO DO
  -Styling
*/}

const initialCarsList = [
  { manufacturer: "BMW", model: "E91", year: 2009 },
  { manufacturer: "Audi", model: "A4", year: 2021 },
  { manufacturer: "Dacia", model: "Logan", year: 2025 }
];

function Home({carsList, setCarsList}) {
  const navigate = useNavigate();

  const [sortConfig, setSortConfig] = useState({ key: 'manufacturer', direction: 'ascending' });

  const [search, setSearch] = useState('');

  const addButtonHandler = () => {
    navigate("/operations");
  };

  const deleteButtonHandler = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if(confirmDelete){
      setCarsList(carsList.filter((_,idx) => idx !== index));
    }
  }

  const editButtonHandler = (index) =>{
    navigate("/operations/" + index);
  }

  const filteredCars = carsList.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortHandler = (key) => {
    let direction = "ascending";
    if(sortConfig.key === key && sortConfig.direction === "ascending")
    {
      direction = "descending";
    }
    setSortConfig({key, direction});
    const sortedCars = [...carsList].sort((a,b) => {
      if(a[key] < b[key])
      {
        return direction === 'ascending' ? -1 : 1;
      }
      if(a[key] > b[key])
      {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setCarsList(sortedCars);
  }

  return (
    <div className="page">
      <header>
        Car Dealership
      </header>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
      </div>
      <table border="1" style={{width: "70%" }}>
        <thead>
          <tr>
            <th onClick={() => sortHandler("manufacturer")}>Manufacturer</th>
            <th onClick={() => sortHandler("model")}>Model</th>
            <th onClick={() => sortHandler("year")}>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.length === 0 ? (
            <tr>
              <td colSpan="4">No cars found</td>
            </tr>
          ) : (
            filteredCars.map((car, index) => (
              <tr key={index}>
                <td>{car.manufacturer}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>
                  <button onClick={() => editButtonHandler(index)}>Edit</button>
                  <button onClick={() => deleteButtonHandler(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
        <button onClick={addButtonHandler} className="button">Add</button>
      </div>
    </div>
  );
}


function Operations({carsList, setCarsList})
{
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = id !== undefined;
    const carToEdit = isEditing ? carsList[parseInt(id)] : { manufacturer: "", model: "", year: "" };


    const [manufacturer, setManufacturer] = useState(carToEdit?.manufacturer || "");
    const [model, setModel] = useState(carToEdit?.model || "");
    const [year, setYear] = useState(carToEdit?.year || "");

    const [errors, setErrors] = useState({ manufacturer: '', model: '', year: '' });

    const validateData = () =>{
      let newErrors = {manufacturer: '', model: '', year: ''};

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

      setErrors(newErrors);

      return Object.values(newErrors).every((error) => error === '');
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      const newCar = {manufacturer, model, year};
      if (validateData()) {
        alert("Form submitted successfully!");
        if (isEditing) {
          const updatedCars = [...carsList];
          updatedCars[parseInt(id)] = newCar;
          setCarsList(updatedCars);
        } 
        else {
          setCarsList([...carsList, newCar]);
        }
      }
      else{
        alert("Correct the errors!")
      }
    }

    return (
        <div>
          <h1>{isEditing ? "Edit Car" : "Add Car"}</h1>
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
              <button type="submit">{isEditing ? "Edit Car" : "Add Car"}</button>
          </form>
        </div>
    );
}



function App() {
  const [carsList, setCars] = useState(initialCarsList);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home carsList={carsList} setCarsList={setCars}/>} />
        <Route path="/operations" element={<Operations carsList={carsList} setCarsList={setCars}/>} />
        <Route path="/operations/:id" element={<Operations carsList={carsList} setCarsList={setCars}/>} />
      </Routes>
    </Router>
  );
}

export default App;
