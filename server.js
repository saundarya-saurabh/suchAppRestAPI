'use-strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var Web3 = require('web3');
var web3 = new Web3();
var abi = require('./suchappToken.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Contract Address
const contractAddress = "0x98f31f15fc35ca84dcc63f0d3818d699e9b87fa7";

const contractInstance = new web3.eth.Contract(abi, contractAddress);
contractInstance.setProvider(new Web3.providers.HttpProvider("https://ropsten.infura.io/YmYCywDkCUPHIqNSA1vk"));
 


// Rest Api for checking total supply

app.get('/api/v1/getTotalSupply', (req, res) => {

    contractInstance.methods._totalsupply().call().then(function (result) {
        if (result != null) {
            res.status(200).json({ "status": "1", "message": "Request Successfully", "data": result });
        } else {
            res.status(404).json({ "status": "0", "message": "Request Failed", "data": null });
        }
    });

});


// Rest API for checking total invested token

app.get('/api/v1/getTotalInvestedToken',(req, res)=>{

    contractInstance.methods.Numtokens().call().then(function (result) {
        if (result != null) {
            res.status(200).json({ "status": "1", "message": "Request Successfully", "data": result });
        } else {
            res.status(404).json({ "status": "0", "message": "Request Failed", "data": null });
        }
    });
});

// Rest API for checking total bonus token

app.get('/api/v1/getTotalBonusToken',(req, res)=>{

    contractInstance.methods.bonustokn().call().then(function (result) {
        if (result != null) {
            res.status(200).json({ "status": "1", "message": "Request Successfully", "data": result });
        } else {
            res.status(404).json({ "status": "0", "message": "Request Failed", "data": null });
        }
    });
});

// Rest API for checking total ether raised

app.get('/api/v1/getTotalEtherRaised',(req, res)=>{

    contractInstance.methods.ethreceived().call().then(function (result) {
        if (result != null) {
            res.status(200).json({ "status": "1", "message": "Request Successfully", "data": result });
        } else {
            res.status(404).json({ "status": "0", "message": "Request Failed", "data": null });
        }
    });
});



// Rest API for checking Token Balance
app.post('/api/v1/getTokenBalance', (req , res ) => {

    const ether_address = req.body.etherAddress;
    
	if (web3.utils.isAddress(ether_address)) {
		//console.log(contractInstance);
		contractInstance.methods.balanceOf(ether_address).call().then(function (result) {
            if (result != null) {
                res.status(200).json({ "status": "1", "message": "Request Successfully", "data": result });
            } else {
                res.status(404).json({ "status": "0", "message": "Request Failed", "data": null });
            }
		});
    } else {
		res.status(404).json({ "status": "0", "message": "Invalid Ether Address", "data": null });
	}

});


const hostname = '0.0.0.0';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`);
})

