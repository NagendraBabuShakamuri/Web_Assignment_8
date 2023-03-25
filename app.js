const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const express = require("express");
const saltRounds = 10;
const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/web_8", {useUnifiedTopology: true, useNewUrlParser: true});

const userSchema = {
  email: String,
  full_name: String,
  password: String
};

const User = mongoose.model("User", userSchema);

app.get("/user/getAll", async function(req, res){
  const users = await User.find({}, {_id: 0, __v: 0});
  res.status(200);
  if(users.length === 0)
    res.send({"Status": 200, "Message": "No users found."});
  else
    res.send(users);
});

app.post("/user/create", async function(req, res){
  const fullName = req.body.full_name;
  const email = req.body.email;
  let password = req.body.password;
  let count = Object.keys(req.body).length;

  if(typeof email !== "string" || !validator.validate(email.trim()))
  {
    res.status(400);
    res.send({"Status": 400, "Message": "Email is not valid, please enter a valid mail id."});
    return;
  }
  else if(typeof fullName !== "string" || !/^[a-zA-Z\s]*$/.test(fullName.trim()) || fullName === "")
  {
    res.status(400);
    res.send({"Status": 400, "Message": "Full name is not valid, only letters and spaces are allowed."});
    return;
  }
  else if(typeof password !== "string" || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
  {
    res.status(400);
    res.send({"Status": 400, "Message": "Password is invalid, password must contain at least one letter and one number and must be at least 8 letters long."});
    return;
  }
  else if(count > 3)
  {
    res.status(400);
    res.send({"Status": 400, "Message": "Request body should contain only email, full_name and password."});
    return;
  }

  const foundUser = await User.findOne({email: email});

  if(foundUser)
  {
    res.status(400);
    res.send({"Status": 400, "Message": "User with the given mail id already exists."});
    return;
  }

  password = await bcrypt.hash(password, saltRounds);

  const user = new User({
    full_name: fullName,
    email: email,
    password: password
  });

  await user.save().then(() => {
    res.status(201);
    res.send({"Status": 201, "Message": "Created a new user successfully."});
  }).catch((err) => {
    res.send(err);
  });

});

app.put("/user/edit", async function(req, res){
  const email = req.body.email;
  const fullName = req.body.full_name;
  let password = req.body.password;
  let count = Object.keys(req.body).length;

  if(typeof email !== "string" || !validator.validate(email.trim()))
  {
    res.status(400);
    res.send({"Status": 400, "Message": "Email is not valid, please enter a valid mail id."});
    return;
  }
  else if(typeof fullName !== "string" || !/^[a-zA-Z\s]*$/.test(fullName.trim()) || fullName === "")
  {
    res.status(400);
    res.send({"Status": 400, "Message": "Full name is not valid, only letters and spaces are allowed."});
    return;
  }
  else if(typeof password !== "string" || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
  {
    res.status(400);
    res.send({"Status": 400, "Message": "Password is invalid, password must contain at least one letter and one number and must be at least 8 letters long."});
    return;
  }
  else if(count > 3)
  {
    res.status(400);
    res.send({"Status": 400, "Message": "Request body should contain only email, full_name and password."});
    return;
  }

  password = await bcrypt.hash(password, saltRounds);

  const update = await User.updateOne({email: email}, {full_name: fullName, password: password});

  if (update.matchedCount > 0) 
  {
    res.sendStatus(204);
  } 
  else 
  {
    res.status(404);
    res.send({"Status": 404, "Message": "User with the given mail id does not exist."});
  }
});

app.delete("/user/delete", async function(req, res){
    const email = req.body.email;
    let count = Object.keys(req.body).length;

    if(typeof email !== "string" || !validator.validate(email.trim()))
    {
        res.status(400);
        res.send({"Status": 400, "Message": "Email is not valid, please enter a valid mail id."});
        return;
    }
    else if(count > 1)
    {
        res.status(400);
        res.send({"Status": 400, "Message": "Request body should contain only email."});
        return;
    }

    const del = await User.deleteOne({email: email});

    if (del.deletedCount > 0)
    {
        res.sendStatus(204);
    }
    else 
    {
        res.status(404);
        res.send({"Status": 404, "Message": "User with the given mail id does not exist."});
    }
});

app.listen(3000, function(){
  console.log("Server started on port:3000");
});