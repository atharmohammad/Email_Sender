const {
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID
} = require("../../config");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'
];

const TOKEN_PATH = 'token.json';


const getAuthUrl = ()=>{
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
}

async function getNewToken(code) {

  //Fetching token with the code we get
    await oAuth2Client.getToken(code, async(err, token) => {

        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);

        // store the token for use in /logged route to send futther messages
        await fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
      });
      //send message sends the message if the oAuth2Client ismauthorised
      // only argument is take is email adress to whom mail is to be sent
      await sendMessage("atharmohammad223@gmail.com");
    });
}

function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
        return encodedMail;
}

async function sendMessage(to) {
    var raw = makeBody(to, 'me',
     'Subject', 'Body : Welcome to Email Sender , Thaks for Signing up');

    const gmail = google.gmail({version: 'v1', oAuth2Client});
    await gmail.users.messages.send({
        auth: oAuth2Client,
        userId: 'me',
        resource: {
            raw: raw
        }

    }, function(err, response) {
        console.log(err,response)
    });
}




module.exports = {
  getAuthUrl:getAuthUrl,
  getNewToken:getNewToken,
  sendMessage:sendMessage
}
