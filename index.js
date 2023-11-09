const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const userRout = require("./routers/users");
const ListRout = require("./routers/List");
const error = require("./middlewares/ErrorHandle");
/////////// connecting to mongodb //////////
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connetion is good"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use("/listings", ListRout);
app.use("/user", userRout);
app.use(error);

///////// listining ///////////////
app.listen(process.env.PORT || 5000, () => {
  console.log("listning on port " + process.env.PORT);
});
