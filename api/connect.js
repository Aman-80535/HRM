const mongoose = require("mongoose");


async function connectToMongoDB(url){
    console.log("4444444444444444444444")
    return mongoose.connect(url);
}

module.exports = {
    connectToMongoDB,
}