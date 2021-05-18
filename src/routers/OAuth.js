const express = require("express");
const axios = require("axios");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const {
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID
} = require("../../config");

const {
  sendMessage,
  getNewToken,
  getAuthUrl
} = require("../utils/OauthFunctions")

const router = new express.Router();
const client_id = GOOGLE_CLIENT_ID;
const client_secret = GOOGLE_CLIENT_SECRET;
const redirect_uris = "http://localhost:8000/authenticated";
const TOKEN_PATH = 'token.json';

//initalise the oAuth2Client for the app
global.oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris);


router.get("/",(req,res)=>{
  const url = getAuthUrl(); //Here we are fetching url for google authentication
  res.redirect(url);//then redirects user  for authentication
});


router.get("/authenticated",async(req,res)=>{ //After authentication the
  // user gets redirected to this url as we chose it as redirect_ui during oAuth function

  if(!req.query.code){
    return res.status(404).send("bad req");
  }

  const code = req.query.code // we take the code from the request

  //we generate token for the code we get and send message
  //the send message
  //go to utils/OauthFunctions for more details
  const response = await getNewToken(code);

  //response after message sent successfully
  return res.send("Messsage has been sent!");
});

router.get("/logged",async(req,res)=>{
  //this end point is used if the user is authenticated
  //and wants to send more messages using the token stored
  //in the token.json

  await fs.readFile(TOKEN_PATH, async(err, token) => {
    if (err) return res.send("unAuthorised");

    oAuth2Client.setCredentials(JSON.parse(token));
    await sendMessage("mohd.rule123@gmail.com");
    res.send("Message Sent")
  });
})

module.exports = router
