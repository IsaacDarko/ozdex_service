const express = require('express');
const Moralis = require('moralis').default;
const cors = require('cors');
const port = 5000;

require('dotenv').config({path: './.env'});
const app = express();

app.use(cors());
app.use(express.json());

//serve static routes
app.use(express.static('dist'));

//import routes
const moralis = require('./routes/apis/moralis.js');
const dex = require('./routes/apis/dex.js');


//use routes
app.use('/api/moralis', moralis);
app.use('/api/dex', dex);


Moralis.start({
    apiKey: process.env.MORALIS_KEY,
}).then(() => {
    app.listen(port, () => {
        console.log(`listening on ${port}`)
    })
});