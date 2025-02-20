//ALL of backend done in terms of functionality and postman testing, 
//minor additions could be made, unit test ready
const express = require('express'); // Import the Express framework to create a server and handle HTTP requests
const app = express();
const cors = require('cors');
const path = require('path');
require('./Schemas/associations');


const sequelize = require('./database/database');

//connect to database
sequelize.authenticate()
    .then(() => console.log("database connected"))
    .catch((err) => console.error("error in connecting to database:", err));

//initialize database tables
async function InitializeDatabase(){
    try{
        await sequelize.sync ({force:false});
        console.log("database tables created");
    }catch(error){
        console.error('failed to create table', error);
    }
}

InitializeDatabase();

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests from localhost (development) and Vercel
        const allowedOrigins = [
            'https://trackmate-git-main-steven-camachos-projects.vercel.app',
            'http://localhost:3001',  // Add this if you're testing locally
            'https://www.trackmate.site'
        ];

        // Allow any Vercel preview deployment
        if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
            callback(null, true);
        } else {
            console.log(`CORS Blocked: ${origin}`);
            callback(new Error('CORS not allowed'));
        }
    },
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
/*
// Define CORS options for cross port communication
const corsOptions = {
    origin: '*',  // Replace with your frontend’s address
    methods: 'GET,POST',              // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
*/
app.use(cors(corsOptions));

app.use(express.json());

app.use('/outputs', (req, res, next) => {
    res.setHeader('Content-Disposition', 'attachment');
    next();
  });
// Make files from the 'outputs' directory static
app.use('/outputs', express.static(path.join(__dirname, 'Routes', 'outputs')));
// Make files from the 'outputs' directory static
app.use('/first_frame', express.static(path.join(__dirname, 'Routes', 'first_frame')));


//make video endpoints available for use by server
const videoRouter = require('./Routes/video');
app.use('/video', videoRouter);

//make user endpoints available for use by server
const userRouter = require('./Routes/users');
const { setWsClient } = require('./Routes_help/videoProcessor');
app.use('/users', userRouter);

//define port
const PORT = 5001;

//have server run on defined port
if (process.env.NODE_ENV!=='test'){
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})};

module.exports=app;