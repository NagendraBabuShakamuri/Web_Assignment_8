const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/web_8", {useUnifiedTopology: true, useNewUrlParser: true});