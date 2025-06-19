import express from "express";
import cors from "cors";

import burgersRoutes from "./routes/burgers";
import authRoutes from "./routes/auth";
import orderRoutes from "./routes/order";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/burgers", burgersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
