require('dotenv').config();
const express = require('express');
const cors = require("cors")
const router = require('../kekabackend/routes/admin-route')
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser())
app.use(cors())
port = 3000;


app.use('/api/auth',router);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  