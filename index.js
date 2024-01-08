const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const userRout = require("./routers/users");
const ListRout = require("./routers/List");
const AddWishList = require("./routers/Wishlist");
const BookRout = require("./routers/bookRout");
const adminRout = require("./routers/admin");
const paymentRout = require("./routers/payment");
const graphRouter = require("./routers/graphRoute");
const error = require("./middlewares/ErrorHandle");
const cookieSession = require("cookie-session");
const session = require("express-session");
const { cloudinaryConfig } = require("./config/Couldinary");
const http = require("http");
const { Server } = require("socket.io");
/////////// connecting to mongodb //////////
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connetion is good"))
  .catch((err) => console.log(err));

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
// });

////////////  CHAT APPLICATION  /////////////////
// io.on("connection", (socket) => {
//   // console.log(`user connected ${socket.id}`);
//   socket.on("join-room", (data) => {
//     // console.log(`user joined with id :${socket.id} room:${data}`);
//     socket.join(data);
//   });
//   socket.on("mes_send", (data) => {
//     // console.log(data);
//     socket.to(data.room).emit("recieve_msg", data);
//   });
//   socket.on("disconnect", () => {
//     // console.log("user disconnetd", socket.id);
//   });
// });
// server.listen(3001, () => console.log("sercer is running"));

//////////////////////////////////////////////////////////////////
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["dil"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);
app.use("/listings", ListRout);
app.use("/user", userRout);
app.use("/addWishList", AddWishList);
app.use("/book", BookRout);
app.use("/admin", userRout);
app.use("/admine/property", adminRout);
app.use("/payment", paymentRout);
app.use("/data", graphRouter);

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
