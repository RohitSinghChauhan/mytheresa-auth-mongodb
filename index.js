const express = require('express');
require('dotenv').config();
const cors = require('cors');

const connection = require('./config/db');
const userRoute = require('./routes/user.route');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.send('Here you are!');
})

app.listen(8080, async () => {
    try {
        await connection;
        console.log('Connected to the DB');
    }
    catch (err) {
        console.log('Unable to connect to the DB', err);
    }

    console.log('Listening at http://localhost:8080');
})