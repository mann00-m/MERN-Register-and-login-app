const express=require("express")
require('dotenv').config();
const app=express()
const bodyparser=require("body-parser")
const AuthRouter=require("./Routes/AuthRouter")
app.use(express.json())

app.use(bodyparser.json())
const cors=require("cors")
app.use(cors())
const PORT=process.env.PORT||8000;
const mongoDb=require("./models/db");
const { signup } = require("./Controllers/AuthController");
mongoDb();

app.get("/",(req,res)=>{
  res.send("pong")
})

app.use("/auth",AuthRouter)

app.listen(PORT)