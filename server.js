const express=require('express');
const morgan=require('morgan');
const path = require('path');
const cors=require('cors');
const bodyParser=require('body-parser');
const querystring = require('querystring-es3');
const session = require('express-session')
const passport =require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
// const twilio = require('twilio');
require('dotenv').config();

const Connection=require('./config/dbConnection');
const User = require('./model/User')

const clientId = process.env.clientId
const clientSecret = process.env.clientSecret

const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')


const app = new express();

// Cross Origin Resource Sharing

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));
// Middleware for logging 

app.use(morgan('dev'));


//  built-in middleware for json

 app.use(express.json());

//  built-in middleware to handle urlencoded form data

 app.use(express.urlencoded({extended:false}))

  app.use(bodyParser.json());

//   app.use(bodyParser.urlencoded({ extended: false }));

// setup session

app.use(session({
    secret:'fathimanezrin08',
    resave:false,
    saveUninitialized:true
}))

// setup passport

app.use(passport.initialize());
app.use(passport.session())

passport.use(
   new  OAuth2Strategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:3001/auth/google/callback",
    scope: ["profile", "email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        console.log("profile",profile)
        try {
            let user = await User.findOne({googleId:profile.id})

            if(!user){
                user = new User({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                })

                await user.save();
            }
            const userData = {accessToken,googleId:profile.id};
            return done(null,userData);
        } catch (error) {
            return done(error,null)
        }
    }
)
)

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

// initial google auth login
app.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}))


app.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/signup"
}), (req, res) => {
    const user = req.user;
    const queryParams = new URLSearchParams({
        accessToken: user.accessToken,
        googleId: user.googleId
    }).toString();
    res.redirect(`http://localhost:3000/gender?${queryParams}`);
});

// Routes


app.use('/oauth',authRoutes);
app.use('/users', userRoutes);

// DB connection

const newConnection = async() =>{
       try {
        await Connection();
       } catch (error) {
       console.log(error);
       }
}


const PORT = process.env.PORT 

 newConnection().then(()=>{
    try {
        app.listen(PORT,()=>{
            console.log(`Server is listening on ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
 })