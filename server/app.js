require("dotenv").config()
const express = require("express")
const path = require('path');

const app = express()
const cors = require('cors');

//error handller middlware
const {errorHandler} = require("./Middlewares/ErrorHandling")
const routeError = require("./Middlewares/Route")
const cookieParser = require('cookie-parser');

// require file connection dataBase MongoDB
const connectDB = require('./Config/DbConfig')



//get function connnection
connectDB();

const {createAdmin} = require("./Controllers/AuthController")


//function for create Default admin
createAdmin();

//use middlware cookieParser
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({ origin:['http://localhost:3000','http://localhost:3001'], credentials: true }));


// require routes in folder routes
const ProjectRoute = require("./Routes/ProjectRoute")
const AuthRoute = require("./Routes/AuthRoute")
const FormationRoute = require("./Routes/FormationRoute")
const ExperienceRoute = require("./Routes/ExperienceRoute")
const FeedBackRoute = require("./Routes/FeedBackRoute")
const CertificatRoute = require("./Routes/CertificatsRoute")


app.use(express.json())

app.use("/api/projects",ProjectRoute)
app.use("/api/auth",AuthRoute)
app.use("/api/formations",FormationRoute)
app.use("/api/experiences",ExperienceRoute)
app.use("/api/feedbacks",FeedBackRoute)
app.use("/api/certificats",CertificatRoute)

app.use('*',routeError)




app.use(errorHandler)


port = process.env.PORT || 5000;

// start server
app.listen(port, ()=> console.log("Server Started: "+port))

module.exports = app;
