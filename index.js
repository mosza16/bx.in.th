'use strict'
const Pairing = require('./model/Pairing');
const Trade = require('./model/Trade');
const HistoricalTrade = require("./model/HistoricalTrade");

async function run(){
    //await Pairing.getPairingById(1);
    //console.log(x)
    //console.log(await Trade.getHighbidByPairingId(30))
    console.log(await HistoricalTrade.getHistoricalTrade(1,new Date()))
    
    
} 
run()