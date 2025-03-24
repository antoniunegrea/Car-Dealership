import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { useNavigate } from "react-router";

const Charts = ({ carsList }) => {
  const navigate = useNavigate();

  const [priceData, setPriceData] = useState([]);
  const [manufacturerData, setManufacturerData] = useState([]);
  const [yearData, setYearData] = useState([]);

  useEffect(() => {
    const priceStats = carsList.map(car => ({ name: car.model, price: car.price }));
    setPriceData(priceStats);

    const manufacturerCounts = carsList.reduce((acc, car) => {
      acc[car.manufacturer] = (acc[car.manufacturer] || 0) + 1;
      return acc;
    }, {});
    setManufacturerData(Object.entries(manufacturerCounts).map(([name, value]) => ({ name, value })));

    const yearCounts = carsList.reduce((acc, car) => {
      acc[car.year] = (acc[car.year] || 0) + 1;
      return acc;
    }, {});
    setYearData(Object.entries(yearCounts).map(([name, value]) => ({ name, value })));
  }, [carsList]);

  return (
    <div>
      <button onClick={() => navigate("/")}>Go Back Home</button>
      <div style={{display: "flex", flexDirection: "row" }}>
          <div>
              <h2>Car Price Distribution</h2>
              <BarChart width={400} height={300} data={priceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="price" fill="#8884d8" />
              </BarChart>
          </div>
          <div>
              <h2>Cars by Manufacturer</h2>
              <PieChart width={400} height={300}>
                  <Pie data={manufacturerData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                  {manufacturerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                  ))}
                  </Pie>
                  <Tooltip />
              </PieChart>
          </div>
          <div>
          <h2>Yearly Trends</h2>
              <LineChart width={400} height={300} data={yearData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
          </div>
        
      </div>
    </div>
  );
};

export default Charts;
