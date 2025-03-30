import express, { Request, Response } from "express";
import cors from "cors";
import { carsRouter } from "./routes/cars";

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(cors());

app.use("/api/cars", carsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
