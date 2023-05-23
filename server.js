const express = require("express");
require("dotenv").config();
const app = express();
const path = require('path');
const port = process.env.PORT;
const db=require("./db")
const cors=require("cors")
const bodyParser = require('body-parser');


// Middleware

// Increase payload size limit to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({ origin: 'http://localhost:5173',credentials: true }  ))

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes

app.use(require('./routes/userRoute'));
app.use(require('./routes/adminRoute'));

//Start server

app.listen(port, () => console.log(`connected to http://localhost:${port}`));
