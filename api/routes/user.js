const express = require("express");
const { handleUserSignup} = require("../controllers/user")
const { handleUserLogin, getAllUsers, handleEditUser} = require("../controllers/user")

const router = express.Router();

router.post('/signup', handleUserSignup)
router.post('/login', handleUserLogin)
router.get('/list', getAllUsers)
router.put('/update/:userId', handleEditUser)
module.exports = router;