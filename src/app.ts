import express from "express";
import cors from "cors";
import { router as CategotyRouter } from "./routers/categories";
import { router as ProductRouter } from "./routers/product";
import { idValidation, nameValidation } from "./middlewares/validation";
import { Errors } from "./middlewares/errormiddleware";
import { initConfig } from './utils/config';
import path from "path";

initConfig();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "jsonFiles")));

app.use("/products/:id", idValidation, nameValidation);
app.use("/products", nameValidation);
app.use("/categories/:id", idValidation);
app.use("/products", ProductRouter); //add prefix
app.use("/categories", CategotyRouter); //add prefix
app.use(Errors);
export { app };
