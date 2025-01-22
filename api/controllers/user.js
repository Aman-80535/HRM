const User = require("../models/user")
const { setUser } = require("../service/auth")


const allowedFields = ['firstName', 'lastName', 'contactNumber', 'whatsappNumber', 'referrelCode', 'email', 'password', 'paymentStatus'];
const filterRequestBody = (body, allowedFields) => {
  return allowedFields.reduce((acc, field) => {
    if (body[field] !== undefined) acc[field] = body[field];
    return acc;
  }, {});
};



async function handleUserSignup(req, res) {
  try {
    const newUser = await User.create(filterRequestBody(req.body, allowedFields));

    return res.status(201).json({
      message: 'User created successfully!',
      user: newUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}

async function handleUserLogin(req, res) {
  console.log("1223142523532")
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.status(500).json({ message: 'Error creating user', error: "Might be username or password is incorrect" });
  const token = setUser(user);
  return res.json({ token })
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(201).json({
      message: 'users fetched successfully!',
      data: users
    });
  } catch (err) {
    console.error('Error fetching users:', err);
  }
};



async function handleEditUser(req, res) {
  try {
    const updatedData = filterRequestBody(req.body, allowedFields);
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, updatedData, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      message: 'User updated successfully!',
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}


module.exports = {
  getAllUsers,
  handleUserSignup,
  handleUserLogin,
  handleEditUser
};