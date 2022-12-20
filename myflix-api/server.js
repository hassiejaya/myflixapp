const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/UserRoutes");
const cloudContentRoutes = require("./Routes/CloudcontentRoutes")

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://assignment:assignment.lk@myflixcluster.xihgzx3.mongodb.net/?retryWrites=true&w=majority", {
useNewUrlParser: true,
useUnifiedTopology : true,}).then(()=>{
    console.log("Data Base Connected");
});

app.use("/api/user", userRoutes);
app.use("/api/cloudcontent", cloudContentRoutes);

app.listen(5000, console.log("server-started"));