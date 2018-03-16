const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const socketIO = require('socket.io');

const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () =>{
    console.log('Connected to database' + config.database);
});

// On Error
mongoose.connection.on('error', (err) =>{
    console.log('Connection Error' + err);
});

let app = express();

//port
let port = 8000;

// Routes
const users = require('./routes/users');
const scores = require('./routes/scores');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/users', users);
app.use('/scores', scores);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});


var server = app.listen(port, () => {
    console.log('App started on port ' + port);
    require('./config/createAdmin')();
});

// Socket Config
var io = socketIO(server);

io.on('connection', (socket) => {
            
    socket.on('add-score', () => {
        console.log('socket event');
        socket.emit('scoreUpdate');
    });

});