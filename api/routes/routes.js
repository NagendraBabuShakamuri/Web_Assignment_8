const express = require('express');
const router = express.Router();

const { findUser, getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/controller');

router.post("/user/findUser", findUser);
router.get("/user/getAll", getAllUsers);
router.post("/user/create", createUser);
router.put("/user/edit", updateUser);
router.delete("/user/delete", deleteUser);

module.exports = router;