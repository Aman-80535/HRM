const express = require("express");
const { connectToMongoDB } = require("./connect")

const userRoute = require("./routes/user")
const candidateRouter = require("./routes/candidate")
const leaveRouter = require("./routes/leave")
const path = require("path");
const cors = require('cors');

const cookieParser = require("cookie-parser")
// const { restricToLoggedinUserOnly } = require("./middlewares/auth")


const app = express();
connectToMongoDB('mongodb+srv://Aman:Aman%402222@aman.hu3wz.mongodb.net/?retryWrites=true&w=majority&appName=Aman')
    .then(() => console.log("MongoDb connected"))
    .catch((err) => {
        console.log(err)
    })

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





const PORT = 8002
    ;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/user", userRoute);
app.use("/candidate", candidateRouter);
app.use("/leave", leaveRouter);



app.listen(PORT, () => console.log('Server started at PORT'))





