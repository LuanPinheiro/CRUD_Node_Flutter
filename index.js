const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGO_DB_CONFIG} = require("./config/app.config");
const multer = require("multer");
const errors = require("./middleware/errors"); // Configurações dos módulos e da conexão com o database

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("Database Connected");
    }
    (error) => {
        console.log("Database can't be connected: " + error);
    }
);

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);


app.listen(process.env.port || 4000, function () {
    console.log("Initial Setup Done");
});