const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const router = require('./api/routes/routes.js');
const service = require('./api/services/service.js');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(4000, () => {
  console.log("Server started on port:4000");
});