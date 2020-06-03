const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Create Express app
const app = express();

//Setup Cors Origin Port - TD: not sure what this is doing atm!
const origin = process.env.ORIGIN
var corsOptions = { origin: `http://localhost:${origin}` };
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Database setup
const db = require("./models");
const Role = db.role;

// Configure DB form .env file
const dburi = process.env.DBURI
const dbport = process.env.DBPORT
const dbname = process.env.DBNAME

// Conect to MongoDB using dotenv file parameter.
db.mongoose
  .connect(`mongodb://${dburi}:${dbport}/${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Successfully connected to MongoDB: ${dbname}`);
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  // Intalise MongoDb with Roles Collection
  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          
          console.log("added 'admin' to roles collection");
        });
        
        new Role({
          name: "vendor"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          
          console.log("added 'vendor' to roles collection");
        });
        
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          
          console.log("added 'user' to roles collection");
        });
      }
    });
  }

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Application Server running..." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// done! we export it so we can start the site in start.js
module.exports = app;
