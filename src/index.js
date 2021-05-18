const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const oauthRoutes = require("./routers/OAuth");

const port = process.env.PORT || 8000;

app.use(
  cors({
    origin:"http://localhost:8000/",
    credentials:true
  })
);

app.use(cookieParser());

// After running the app go to the route "/"
//The route "/" fetch URL
// for authentication from google
// and then it redirects to that url ,
// now people need to authenticate
// and allow access for app to send email
// after authentication is compeleted ,
// the user gets redirected to /authenticated which
// then send email from the logged in account

//go to routers/OAuth folder for better understanding

app.use(oauthRoutes);

app.listen(port,()=>console.log(`server runnig at ${port}`))
