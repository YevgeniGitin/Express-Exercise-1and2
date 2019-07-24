import express from 'express';
import cors from 'cors';
import { router as Router } from './routers/router';
// import productjsonfile from './models/products.json';
// import uuidv1 from 'uuid/v1';
// import { Product } from './models/product';

const app = express();
// let productarr: Product[]=productjsonfile.product;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/categories',Router);//add prefix

// first exercise work


// app.get('/products',(req,res)=>{
//     console.log("get all products");
//     res.send(productarr);
// });

// app.get('/products/:id',(req,res)=>{
//     console.log("get product by id");
//     const id:string=req.params.id;
//     const matching = productarr.find(o => o.id === id); 
//     if(id.length!=36){
//         res.sendStatus(400);
//         return;
//     }
//     if (!matching) {
//         res.sendStatus(404);
//         return;
//     }
//     res.status(200).send(matching);
// });

// app.post('/products',(req,res)=>{
//     console.log("add product");
//     const product: Product = req.body;
//     if(product.name.length<3){
//         res.status(409);
//         return;
//     }
//     product.id = uuidv1();
//     product.categoryId = uuidv1();
//     productarr.push(product);
//     res.status(201).send(product);
// });

// app.put('/products/:id',(req,res)=>{
//     console.log("update product by id");
//     const id:string=req.params.id;
//     const matchingIndex = productarr.findIndex(o => o.id === id); 
//     if(id.length!=36){
//         res.sendStatus(400);
//         return;
//     }
//     if(productarr[matchingIndex].name.length<3){
//         res.sendStatus(409);
//         return;
//     }
//     if (!matching) {
//         res.sendStatus(404);
//         return;
//     }
//     let product:Product=req.body;
//     product.id=req.params.id;
//     productarr[matchingIndex]=product;
//     res.status(200).send(productarr[matchingIndex]);
// });

// app.delete('/products/:id',(req,res)=>{
//     console.log("delete item");
//     const id:string=req.params.id;
//     if(id.length!=36){
//         res.sendStatus(400);
//         return; 
//     }
//     const matchingIndex = productarr.findIndex(o => o.id === id);
//     if (matchingIndex < 0) {
//         res.sendStatus(404);
//         return;
//     }
//     productarr.splice(matchingIndex, 1);
//     res.sendStatus(204); 
// });

export{ app };