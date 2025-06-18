import express from 'express';
import cors from 'cors';
import burgersRoutes from './routes/burgers';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/burgers', burgersRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});