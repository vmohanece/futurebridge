import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routers/user.router.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.set("port", port);
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit:"10mb", extended: true}));

mongoose.connect("mongodb://127.0.0.1:27017/futurebridge", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MonogoDb connected!");
}).catch((err)=>{
    console.log("Error: connecting mongoDb");
})

app.use("/users", userRouter);

app.listen(port, ()=>{
    console.log("app listening to port:", port);
});