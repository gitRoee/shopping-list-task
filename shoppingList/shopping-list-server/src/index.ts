import dotenv from "dotenv";
import express, { Express } from "express";
import cors from 'cors';
import { corsConfig } from "./config/cors";
import { categoryRouter } from "./routes/category";
import { shoppingList } from "./routes/shoppingList";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsConfig));
app.use('/api/categories', categoryRouter);
app.use('/api/shoppingList', shoppingList);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

