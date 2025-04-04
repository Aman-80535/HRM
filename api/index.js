const express = require("express");
const { connectToMongoDB } = require("./connect")

const userRoute = require("./routes/user")
const path = require("path");
const cors = require('cors');

const cookieParser = require("cookie-parser")
// const { restricToLoggedinUserOnly } = require("./middlewares/auth")


const app = express();
connectToMongoDB('mongodb+srv://Aman:Aman%402222@aman.hu3wz.mongodb.net/?retryWrites=true&w=majority&appName=Aman')
    .then(() => console.log("MongoDb connected"))

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





const PORT = 8002
    ;
app.use("/user", userRoute);



app.listen(PORT, () => console.log('Server starteda at PORT'))





