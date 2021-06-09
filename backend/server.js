const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const keys = require("./config/keys");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

mongoose.connect(keys.mongoURI, { useFindAndModify: false })
    .then( () => console.log("[Server] DB connected."))
    .catch(err => console.log(err));


const port = process.env.PORT || 5000;

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/books", booksRouter);



app.listen(port, () => {
   console.log(`[Server] server has been started on port: ${port}`);
});
