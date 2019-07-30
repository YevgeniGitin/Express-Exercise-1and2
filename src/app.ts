import express from "express";
import cors from "cors";
import { router as CategotyRouter } from "./routers/categories";
import { router as ProductRouter } from "./routers/product";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/products", ProductRouter); //add prefix
app.use("/categories", CategotyRouter); //add prefix

export { app };
