import express from 'express';
import cors from 'cors';
import { router as Router } from './routers/router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/categories',Router);//add prefix


export{ app };