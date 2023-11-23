const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const userRout = require("./routers/users");
const ListRout = require("./routers/List");
const AuthRout = require("./routers/auth");
const AddWishList = require("./routers/Wishlist");
const BookRout = require("./routers/bookRout");
const adminRout = require("./routers/admin");
const error = require("./middlewares/ErrorHandle");
const passport = require("passport");
const passportSetup = require("./passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
const { cloudinaryConfig } = require("./config/Couldinary");
/////////// connecting to mongodb //////////
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connetion is good"))
  .catch((err) => console.log(err));
app.use(
  cookieSession({
    name: "session",
    keys: ["dil"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);
app.use("/listings", ListRout);
app.use("/user", userRout);
app.use("/auth", AuthRout);
app.use("/addWishList", AddWishList);
app.use("/book", BookRout);
app.use("/admin", userRout);
app.use("/admine/property", adminRout);
// app.use(error);

///////// listining ///////////////
app.listen(process.env.PORT || 5000, () => {
  console.log("listning on port " + process.env.PORT);
});

//TODO: remove uploaded file after upload cloudinary
//TODO: jwt refresh token
//TODO: use reference in schema✅
//TODO: create semperate model for whishList✅
//TODO: impliment git ignor✅
//TODO: use enum [like socialType ,userType in User schema]✅
