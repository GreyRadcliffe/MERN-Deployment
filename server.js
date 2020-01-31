const express = require("express");
const cors = require("cors");
const app = express();

require('./server/config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({  extended: true }));
require('./server/routes/pet.routes')(app);
app.listen(8000, () => {
    console.log("You are locked and loaded on port 8000");
})