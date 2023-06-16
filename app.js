import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthController from "./controllers/auth-controller.js";
import UploadController from "./controllers/upload-controller.js";
import UserController from "./controllers/user-controller.js";
import BillController from "./controllers/bill-controller.js";

mongoose.connect(
  "mongodb+srv://markus:zjh991600@treasure.gkhdtga.mongodb.net/piggy-bank?retryWrites=true&w=majority"
);

const whiteUrlList = [
  "/api/users/register",
  "/api/users/login",
  "/api/users/logout",
  "/api/bills/all",
  "/api/bills/id",
  "/api/bills/uid",
  "/api/bills/categories",
  "/api/bills/time",
  "/api/bills/cost",
  "/api/bills/contents",
  "/api/files/id",
];

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "sessionKey",
    name: "token",
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    saveUninitialized: true,
    rolling: true,
  })
);

app.use(function (req, res, next) {
  const { userInfo } = req.session;
  if (
    !whiteUrlList.includes(req.url) &&
    !req.url.startsWith("/api/files/id")
  ) {
    console.log(req.url);
    if (!userInfo) {
      res.send({ flag: false, status: 403, msg: "cookies outdated", email: 0 });
    } else {
      next();
    }
  } else {
    console.log(req.url);
    next();
  }
});

UserController(app);
BillController(app);
UploadController(app);
AuthController(app);

app.listen(4000);
