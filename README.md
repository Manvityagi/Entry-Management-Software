# Introduction
![](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/EMS1.png)

**Entry Management Software** is an implementation of a multi-host, multi-visitor entry management system.
## 🔨  Working
  - The system is flexible to accomodate multiple hosts for multiple visitors. 
  - The software admin can register new hosts by using the ```Register as host``` option from Home Page.
  - ```Check-in as guest``` checks in the visitor & allots a host to the visitor from the the host attending the least visitors at that time. At the same time , an email and sms is sent to the host alloted for the visitor about the details of the visitor
  - ```Check-out Guest``` checks out the visitor & sends an email & sms to the visitor including relevant details
  
## 🚧  Technology Stack
- **Server Enviornment** - NodeJS
- **Framework** - ExpressJS
- **Database** - MongoDB
- **Cloud database service** - MongoDB Atlas
- **Module to send emails** - NodeMailer
- **SMS sending** - Twilio
- **Deployment** - Heroku

## [VIEW LIVE DEMO](https://hidden-savannah-59110.herokuapp.com/)
**Note** : SMS can be sent to only Twilio verified numbers as I am not using the paid service.

# 💡 Approach
### Alloting Hosts to Visitors
 - One of the main bottlenecks was to decide the approach to allot visitors to the hosts.
 - For the same, I came up with the idea to store the count of visitors, each host is attending at any time.
 - Whenever a new visitor checks-in, I sort the hosts based on the count of visitors they are attending currently, and allot the host with miniumum visitor to the new visitor.
 - When any visitor checks out, the visitor-count for the host of that visitor is decreased by one.
 - The above approach ensures optimized distrubution of visitors among hosts.
 ### Mailing 
- Mails are sent by an admin email-id to the host when a visitor checks in & to the visitor when she/he checks-out using the nodemailer module
### SMS
- SMS are sent to to the host when a visitor checks in & to the visitor when she/he checks-out using Twilio's free account
### Validations and Error Handling
- Email and Phone numbers are validate for correct format, and errors due to duplicacy of index data are reported using connect-flash
### Edge Cases Handled 💡
- If there are no hosts registered & a visitor checks-in, then an error for the same is reported.
- Duplicate hosts are restricted
- A checked-in user cannot check-in again before checking out : I used a boolean variable ```checked-in``` to keep track of the same & check this variable before checking in the user.
- A visitor is created only once , that is , if the visitor is visiting for the second time , it will not be created again, but all other process will go as expected.



## ⬇️ Installation
 - First, fork this repository 🍴 and follow the given instructions:
 ```
 # clone the repository to your local machine
$ git clone https://github.com/<YOUR-GITHUB-USERNAME>/Entry-Management-Software.git

# navigate to the project's directory and install all the relevant dev-dependencies
$ cd Entry-Management-Software && npm intsall

# Make a .env file and include the details as per config.js 

# Start application
$ node app.js

# Visit http://localhost:5000/ in your browser
 ```
 
 ## Demo Images
 ### Check-in Page
 ![Check-in Page](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/checkin.png)
 ### After Check-in
 ![After Check-in](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/After_checkin.png)
 ### SMS to Host after visitor checks-in
 ![SMS Host](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/sms_host.png)
 ### Mail to host after visitor checks-in
 ![Mail Host](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/mail_host.png)
 ### Check-out Page
 ![Check-out Page](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/check_out.png)
 ### After Check-out
 ![After Check-out](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/after_checkout.png)
 ### SMS to visitor after visitor checks-out
 ![SMS Visitor](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/sms_visitor.png)
 ### Mail to visitor after visitor checks-out
 ![Mail visitor](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/mail_visitor.png)
 ### Dashboard
 ![Dashboard](https://github.com/Manvityagi/Entry-Management-Software/raw/master/images/dashboard.png)

  ## Future Extensions
  This project has a lot to be extended: 
  1. Whenever a visitor checks-in , his/her picture can be captured for security purposes
  2. OTP verification of phone number can be set-up before allowing the visitor to enter
  3. Dashboard can be managed according to dates 
  4. Authentications for registering new users can be setup
  5. Each host can be given a profile and dashboard to manage their visitors
And many more things can be added to this project. 




