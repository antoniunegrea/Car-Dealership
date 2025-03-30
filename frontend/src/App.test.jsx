import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as MemoryRouter} from "react-router";
import App from './App';
import Home from './Home';
import Operations from './Operations';
import { useState } from 'react';


const mockCarsList = [
  { manufacturer: "BMW", model: "E91", year: 2009, price: 5500 }
];


const mockSetCarsList = jest.fn();


describe('App Component', () => {
  test('test render app', () => {

    render(
        <App cars={mockCarsList} setCars={mockCarsList}/>
    );
    const headerElement = screen.getByText("Car Dealership");
    expect(headerElement).toBeInTheDocument();
  });
});

describe('CRUD Tests', () => {
  
  // Read
  test('test read', () => {
    render(
      <MemoryRouter>
        <Home carsList={mockCarsList} setCarsList={mockSetCarsList} />
      </MemoryRouter>
    );

    const carManufacturer = screen.getByText("BMW");
    expect(carManufacturer).toBeInTheDocument();
    const carModel = screen.getByText("E91");
    expect(carModel).toBeInTheDocument();
  });

  //Delete
  test('test delete', () => {
    window.confirm = jest.fn(() => true);
    function TestWrapper() {
      const [carsList, setCarsList] = useState(mockCarsList);
  
      return (
        <MemoryRouter>
          <Home carsList={carsList} setCarsList={setCarsList} />
        </MemoryRouter>
      );
    }
  
    render(<TestWrapper />);
  
    expect(screen.getByText("BMW")).toBeInTheDocument();
    expect(screen.getByText("E91")).toBeInTheDocument();
  
    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText("BMW")).not.toBeInTheDocument();
    expect(screen.queryByText("E91")).not.toBeInTheDocument();

  });

  //Add
  test('test add', () => {
    window.alert = jest.fn(() => true); 
    
    function TestWrapper() {
      const [carsList, setCarsList] = useState(mockCarsList);
  
      return (
        <MemoryRouter>
          <Operations carsList={carsList} setCarsList={setCarsList} />
          <ul>
            {carsList.map((car, index) => (
              <li key={index}>{`${car.manufacturer} ${car.model}`}</li>
            ))}
          </ul>
        </MemoryRouter>
      );
    }
  
    render(<TestWrapper />);
  
    fireEvent.change(screen.getByPlaceholderText("Manufacturer"), { target: { value: "Toni" } });
    fireEvent.change(screen.getByPlaceholderText("Model"), { target: { value: "Boss" } });
    fireEvent.change(screen.getByPlaceholderText("Year"), { target: { value: "1900" } });
    fireEvent.change(screen.getByPlaceholderText("Price"), { target: { value: "100" } });
  
    fireEvent.click(screen.getByText("Add Car"));
  
    expect(screen.getByText("Toni Boss")).toBeInTheDocument();
  });

  //update
  test('test update', async () => {
    const initialCarsList = [
      { manufacturer: "BMW", model: "E91", year: 2009, price: 5500 },
      { manufacturer: "Audi", model: "A4", year: 2021, price: 2500 },
    ];

    render(
      <App carsList={initialCarsList} />
    );

    expect(screen.getByText("BMW")).toBeInTheDocument();
    expect(screen.getByText("E91")).toBeInTheDocument();

    const editButton = screen.getAllByText("Edit")[0];
    fireEvent.click(editButton);

    expect(screen.getByPlaceholderText("Manufacturer").value).toBe("BMW");
    expect(screen.getByPlaceholderText("Model").value).toBe("E91");
    expect(screen.getByPlaceholderText("Year").value).toBe("2009");
    expect(screen.getByPlaceholderText("Price").value).toBe("5500");

    fireEvent.change(screen.getByPlaceholderText("Manufacturer"), { target: { value: "BMW Updated" } });
    fireEvent.change(screen.getByPlaceholderText("Model"), { target: { value: "E92" } });
    fireEvent.change(screen.getByPlaceholderText("Year"), { target: { value: "2010" } });
    fireEvent.change(screen.getByPlaceholderText("Price"), { target: { value: "6000" } });

    fireEvent.click(screen.getByText("Edit Car", {selector: 'button'}));

    fireEvent.click(screen.getByText("Go Back Home"));

    expect(screen.getByText("BMW Updated")).toBeInTheDocument();
    expect(screen.getByText("E92")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("6000")).toBeInTheDocument();
  });

});


