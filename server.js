require("dotenv").config();

const express= require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
// const fileUpload= require("express-fileupload");

const navbarRoutes = require("./controller/navbar-cont"); // Use navbar-cont.js

const aboutRoutes = require("./controller/navbar-cont");


const app= express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));  //middleware (in Express) that parses incoming requests with URL-encoded payloads.
app.use(cors());

// // File upload middleware
// app.use(fileUpload({
//     useTempFiles:true,
//     tempFileDir:"/tmp/",
// }))

// routes
app.use("/auth", authRoutes);

app.use("/home", navbarRoutes); // Use navbar-cont.js for uploads
app.use("/get", aboutRoutes);


app.get("/", (req, res) => {
    res.send("Keka clone backend is running");
});



const PORT= process.env.PORT ||5000;
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));