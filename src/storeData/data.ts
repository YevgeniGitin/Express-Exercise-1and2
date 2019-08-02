import { Product } from "../models/product";
import { Categories } from "../models/categories";
import { createHttpClient } from "../utils/http-client";

 export let productarr:Product[];
 export let categoriesarr:Categories[];

 export async function setdata(){
    const port = process.env["PORT"];
    let client = createHttpClient(`http://localhost:${port}/public`);
     let temp;
     temp=await client.get("/categories.json");
     categoriesarr=temp.categories;
     temp=await client.get("/products.json");
     productarr=temp.product;
 }