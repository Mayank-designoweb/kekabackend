require('dotenv').config();
const express = require('express');
const cors = require("cors")
const rateLimit = require('express-rate-limit');
const morgan = require('morgan')
const router = require('../kekabackend/routes/admin-route')
const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())
port = 3000;
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many request from this IP"
})

app.use('/api/auth',limiter, router);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  