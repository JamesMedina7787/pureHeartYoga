

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const ejs = require('ejs');






//const { MongoClient } = require('mongodb');
//const connectDB = require('./db.js')
//Load configure


//connectDB()



const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path')
const fs = require('fs')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcrypt')
//const flash = require('express-flash')
const session= require("express-session")

// const connectionString = 'mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority';


//database connection
//MongoClient.connect(connectionString, function(err, client) {
//  if (err) {
//    console.error('An error occurred while connecting to MongoDB Atlas:', err);
//    return;
//  }



  // Connection successful
//  console.log('Connected to MongoDB Atlas!');

  // Start interacting with the database here

  // Close the connection when finished
//  client.close();
// });





//initializePassport(passport, email => {
//  users.find(user =>user.email === email)
//})
const users = []
/**
const User = require('./user.js');
const initializePassport = require('./passportConfig.js');

// Initialize Passport with correct functions to retrieve users by email and id
initializePassport(
  passport,
  async (email) => await User.findOne({ email }),
  async (id) => await User.findById(id)
);

// Rest of your routes and code...



const accountSid =  process.env.accountSid
const authToken =  process.env.authToken
const PUB_KEY = process.env.PUB_KEY
//const SECRET_KEY = process.env.SECRET_KEY
const MONGO = process.env.MONGO

const stripe = require('stripe')(SECRET_KEY);

 **/

const emailPassword = process.env.emailPassword
const emailService = 'outlook.com'
const emailRecipient = 'pureheartyoga@outlook.com';
const emailSender = 'jamesmedina7787@outlook.com';
const PORT = process.env.PORT || 3000



app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(flash())

/**
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

**/
app.get("/", (req, res)=>{
  res.render('mainPage')
})



// Configure Nodemailer settings



// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: emailSender,
    pass: emailPassword,
  },
});

// Create Express app

//passport.use(new GoogleStrategy({
//    clientID: GOOGLE_CLIENT_ID,
//    clientSecret: GOOGLE_CLIENT_SECRET,
//    callbackURL: "http://your-app/callback"
//  },
//  function(accessToken, refreshToken, profile, cb) {
//    // Implement your authentication logic here
//    // Call the 'cb' callback with the appropriate arguments
//  }
//));


// Serve the HTML form

// Handle the form submission
app.post('/send_email', (req, res) => {


  const mailOptions = ({
    from: emailSender,
    to: emailRecipient,
    subject: `Message from Pure Heart : ${req.body.name} sent you a message from ${req.body.email}`,
    html: `${req.body.message}`

  });

 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email:`);
    } else {
      console.log(`Email sent:` + `${req.body.message}`);
  res.send('Message sent!');
}
response.redirect('/')
})
})


app.get("/mainPage", (req, res)=>{
  res.render('mainPage.ejs')
})


/**
app.get("/book", (req, res)=>{
  res.render('book.ejs')
})



app.get('/payment', function(req, res){
  fs.readFile('items.json', function(error, data){
    if(error){
      res.status(500).end()
    } else {
      res.render('payment.ejs', {
       publicKey: PUB_KEY,
       items: JSON.parse(data)
      })
    }
  })
})

 app.post('/book', function(req,res){
  fs.readFile('items.json', function(error, data){
    if(error){
      res.status(500).end()
    } else {
      stripe.charges.create({
        amount: 1000,
        source: req.body.stripeTokenId,
        currency: "usd"
      }).then(function(){
        console.log('success')
        res.json({'message':'yay'})
      }).catch(function(){
        console.log('fail')
        res.status(500).end()
      })
      }
    }
)
})**/



// Use the stripe object to interact with Stripe's API

// Example: Create a customer
//stripe.customers.create({
//  email: 'customer@example.com',
//}).then(customer => console.log(customer))
//  .catch(error => console.error(error));


//app.post('/book', function(req,res){
//  fs.readFile('items.json', function(error,data){
//    if (error) {
//      res.status(500).end()
//    }else{
//      console.log('purchase')
//        }
//  })
//})




app.get("/about", (req, res)=>{
  res.render('about.ejs')
})
/**
app.get('/login',checkNotAuthenticated , (req,res)=>{
  res.render('login.ejs')
})





app.get('/success',checkAuthenticated, (req, res) => {
  res.render('success.ejs', {name:"james"})
})

app.post('/login',checkNotAuthenticated , passport.authenticate("local", {
  successRedirect:'/success',
  failureRedirect:'/login',
  failureFlash: true
}))

app.get("/register",checkNotAuthenticated ,(req, res)=>{
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const { name, email, pw } = req.body;


    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Handle case when user already exists
      return res.redirect('/register'); // You might want to display an error message here
console.log(existingUser + "existing user")
    }

    // Hash the password before saving it to the database
    const hashPW = await bcrypt.hash(pw, 10);
users.push({name: req.body.name, email: req.body.email, pw: hashPW})
    // Create a new user object
    const newUser = new User({
      name,
      email,
      pw: hashPW,
    });
console.log(newUser + "new User")
console.log(users)
    // Save the user to the database
    await newUser.save();

    // Redirect to the success page after successful registration
    res.redirect('/success');
  } catch (error) {
    // Handle any errors that occurred during registration
    console.error(error);
    res.redirect('/register'); // You might want to display an error message here
  }
});
 **/
app.get('/gallery', (req,res)=>{
  res.render('gallery.ejs')
})

//app.post("/pay", (req, res)=>{
//  stripe.charges.create({
//  amount: 2000, // amount in cents
//  currency: 'usd',
//  source: 'tok_visa', // replace with actual card token
//  description: 'Example charge'
//}, function(err, charge) {
//  if (err) {
  //  console.error(err);
  //} else {
  //  console.log(charge);
    // Handle successful charge
//  }
//});

//})

/**
function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
      res.redirect('/login')
}


function checkNotAuthenticated(req, res, next){
 if (req.isAuthenticated()){
   return res.redirect('/')
 }
 next()
}

**/
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
