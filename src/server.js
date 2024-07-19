import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorhandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : "50mb"}));

app.use(cookieParser());

app.use("/api/users", userRoutes);


app.get("/", (req,res)=> res.send("Server ON"));

app.use(notFound);
app.use(errorhandler);

app.listen(port, ()=> console.log(`Server Started On PORT : ${port}`));