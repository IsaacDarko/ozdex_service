const express = require('express');
const router = express.Router();
const cors = require('cors');
const axios = require('axios');

//initialising express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setting up headers using cors package
app.use(cors());

require('dotenv').config({path: './.env'});
const authToken = process.env.ONEINCH_API_KEY;



//check for 1inch aggregator contract allowance
router.get('/check', async(req, res) => {
    const { query } = req;
    const {tokenAddress, walletAddress} = query;

    const options = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      };

    axios.get(`https://api.1inch.dev/swap/v5.2/1/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`, options)
    .then(response =>{
        console.log(response.data)
        res.status(200).json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})



//approve 1inch aggregator allowance to spend funds
router.get('/grant', async(req, res) => {
    const { query } = req;
    const {tokenAddress} = query;
    console.log(tokenAddress);

    const options = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      };

      axios.get(`https://api.1inch.dev/swap/v5.2/1/approve/transaction?tokenAddress=${tokenAddress}`, options)
      .then(response => {
        console.log(response.data);
        res.status(200).json(response.data)
      })
      .catch(err => {
        console.log(err)
      })
})



//execute swap with the allowed token
router.get('/swap', async(req, res) => {
    const { query } = req;
    console.log(query);
    const {src, dst, amount, from, slippage} = query;

    const options = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
    };

    axios.get(`https://api.1inch.dev/swap/v5.2/1/swap?src=${src}&dst=${dst}&amount=${amount}&from=${from}&slippage=${slippage}`, options)
      .then(response => {
        console.log(response.data);
        res.status(200).json(response.data)
      })
      .catch(err => {
        console.log(err)
      })
})

module.exports = router;