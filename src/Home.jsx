import "./styles.css"
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function Home({ carsList, setCarsList }) {
    const navigate = useNavigate();
  
    const [sortConfig, setSortConfig] = useState({ key: 'manufacturer', direction: 'ascending' });
    const [search, setSearch] = useState('');
  
    const [stats, setStats] = useState({minPrice: 0, maxPrice: 0, avgPrice: 0});
  
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const averageError = 300;
  
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
  
  
    useEffect(() => {
      if (carsList.length === 0) {
        setStats({ minPrice: 0, maxPrice: 0, avgPrice: 0 });
        return;
      }
  
      const prices = carsList.map(car => parseInt(car.price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const avgPrice = Math.floor(prices.reduce((sum, price) => sum + price, 0) / prices.length);
  
  
      setStats({ minPrice, maxPrice, avgPrice });
    }, [carsList]);
  
  
    const addButtonHandler = () => {
      navigate("/operations");
    };
  
    const deleteButtonHandler = (index) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this car?');
      if (confirmDelete) {
        setCarsList(carsList.filter((_, idx) => idx !== index));
      }
    };
  
    const editButtonHandler = (index) => {
      navigate("/operations/" + index);
    };
  
    const filteredCars = carsList.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  
    const displayedCars = filteredCars.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  
    const sortHandler = (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
      const sortedCars = [...carsList].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setCarsList(sortedCars);
    };
    
    const chartsButtonHandler = () => {
      navigate("/charts");
    };
    
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
        <div>
          <ul>
            Stats:
            <li>Max price: ${stats.maxPrice}</li>
            <li>Min price: ${stats.minPrice}</li>
            <li>Avg price: ${stats.avgPrice}</li>
            <li>Avg error: ${averageError}</li>
          </ul>
        </div>
        <table border="1" style={{ width: "70%" }}>
          <thead>
            <tr>
              <th onClick={() => sortHandler("manufacturer")}>Manufacturer</th>
              <th onClick={() => sortHandler("model")}>Model</th>
              <th onClick={() => sortHandler("year")}>Year</th>
              <th onClick={() => sortHandler("price")}>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedCars.length === 0 ? (
              <tr>
                <td colSpan="5">No cars found</td>
              </tr>
            ) : (
              displayedCars.map((car, index) => (
                <tr key={index}>
                  <td>{car.manufacturer}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td
                    style={{
                      backgroundColor:
                        parseInt(car.price) === stats.maxPrice
                          ? 'lightcoral'
                          : parseInt(car.price) === stats.minPrice
                          ? 'lightgreen'
                          : Math.abs(parseInt(car.price) - stats.avgPrice) < averageError
                          ? 'lightblue'
                          : 'transparent',
                    }}
                  >
                    {car.price}
                  </td>
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
          <button onClick={chartsButtonHandler} className="button">Open Charts</button>
        </div>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={Math.ceil(carsList.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          
        />
      </div>
    );
  }

  export default Home;