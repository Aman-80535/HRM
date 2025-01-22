
const jwt = require("jsonwebtoken")
const secret = "Aman123"
function setUser(user) {
    return jwt.sign({
        _id: user.id,
        email: user.email
    }, secret)
}

function getUser(token) {
    console.log(token)
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser
}