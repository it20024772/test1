const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

//routes
const studentRegPaymentsRouter = require("./routes/studentRegistrationPayments.js");
const studentSubjectPaymentsRouter = require("./routes/studentSubjectPayments.js");
const regPaymentsRouter = require("./routes/registrationPayments.js");
const subjectPaymentsRouter = require("./routes/subjectPayments.js");
const userRoutes = require("./routes/users.js");

app.use("/studentRegistrationPayment", studentRegPaymentsRouter);
app.use("/studentSubjectPayment", studentSubjectPaymentsRouter);
app.use("/registrationPayments", regPaymentsRouter);
app.use("/subjectPayments", subjectPaymentsRouter);
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
})
