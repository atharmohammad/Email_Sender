# Email_Sender

## Use
Email Sender can be use to send mail from your Gmail account to any other person account by just authorizing it from gmail one time

## Endpoints
- the '/' end point in it redirects user to gmail for authorization and then after authorization it redirects it to '/authenticated' endpoint

- the '/authenticated' end point sends the mail to any user (currently hardcoded in routes, should be obtained from front-end) from the gmail account of user which authenticated

- "/logged" endpoint is used when we have token stored and we can further send mails from the authenticated gmail account to any account (currently hardcoded in routes, should be obtained from front-end)

- Every token generated will be stored in token.json


### Additional information 
Since the App is not currently verified by google which takes 2-3 days , only those gmail accounts can get authorised which are verified by project in google console
