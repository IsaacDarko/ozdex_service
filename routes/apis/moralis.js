const express = require('express');
const router = express.Router();
const cors = require('cors');
const Moralis = require('moralis').default;


//initialising express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setting up headers using cors package
app.use(cors());


router.get('/tokenprice', async(req, res) => {
    const { query } = req;

    const resOne = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressOne
    })

    const resTwo = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressTwo
    })

    console.log(resOne.raw);
    console.log(resTwo.raw);

    const usdPrices = {
        tokenOne: resOne.raw.usdPrice,
        tokenTwo: resTwo.raw.usdPrice,
        ratio: resOne.raw.usdPrice/resTwo.raw.usdPrice
    }


    return(res.status(200).json(usdPrices));
});

module.exports = router;