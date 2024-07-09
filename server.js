const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const path=require('path');
const bodyParser=require('body-parser');
const querystring = require('querystring-es3');


const Connection=require('./config/dbConnection');


// const bookRoutes=require('./routes/bookRoutes');
// const userRoutes=require('./routes/userRoutes');
const authRoutes=require('./routes/authRoutes');
// const rentedRoutes=require('./routes/rentedRoutes');


require('dotenv').config();

const app = new express();

// Cross Origin Resource Sharing

app.use(cors());

// Middleware for logging 

app.use(morgan('dev'));


//  built-in middleware for json

 app.use(express.json());

//  built-in middleware to handle urlencoded form data

 app.use(express.urlencoded({extended:false}))

  app.use(bodyParser.json());

//   app.use(bodyParser.urlencoded({ extended: false }));






// Routes

// app.use('/books',bookRoutes);
// app.use('/user',userRoutes);
app.use('/auth',authRoutes);
// app.use('/ReNtEd',rentedRoutes);

// DB connection

const newConnection = async() =>{
       try {
        await Connection();
       } catch (error) {
       console.log(error);
       }
}
// // serve static files
// app.use(express.static(path.join(__dirname , './client/build')));
// app.get('*', function (_, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'), function(error){
//         res.status(500).send(error);
//     })
// })

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