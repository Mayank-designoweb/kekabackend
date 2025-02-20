require('dotenv').config();
const express = require('express');
const cors = require("cors")
const morgan = require('morgan')
const router = require('../kekabackend/routes/admin-route')
const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())
port = 3000;


app.use('/api/auth',router);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  