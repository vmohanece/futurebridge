import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import movieRouter from "./src/routers/movie.router.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 4002;

app.set("port", port);
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit:"10mb", extended: true}));
app.use(cors());
app.use("/movies", movieRouter);

app.listen(port, ()=>{
    console.log("app listening to port:", port);
});