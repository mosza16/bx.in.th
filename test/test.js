'usestrict'
const expect = require('expect.js');
const Pairing = require('../model/Pairing');
const Trade = require('../model/Trade');
const HistoricalTrade = require("../model/HistoricalTrade");
describe('Pairing',  function() {
    //this.timeout(15000); 
    it('getPairing', async () =>  {
        const pairings = await Pairing.getPairing()
        expect(pairings).to.be.an(Array);
        expect(pairings[0]).to.be.a(Pairing);
        
    });

    it('getPairingById', async () =>  {
        const pairing = await Pairing.getPairingById(1);
        expect(pairing.getPairing_id()).to.eql(1); 
    });

    it('getPairingByPrimaryCur BTC', async () =>  {
        const pairings = await Pairing.getPairingByPrimaryCur("BTC");
        expect(pairings).to.be.an(Array);
        expect(pairings[0]).to.be.a(Pairing);
        expect(pairings[0].getPrimary_currency()).to.eql("BTC"); 
    });

    it('getPairingBySecondaryCur BTC', async () =>  {
        const pairings = await Pairing.getPairingBySecondaryCur("BTC");
        expect(pairings).to.be.an(Array);
        expect(pairings[0]).to.be.a(Pairing);
        expect(pairings[0].getSecondary_currency()).to.eql("BTC"); 
    });
    
    it('getPairingBySecondaryCur BTC and ETH', async () =>  {
        const pairing = await Pairing.getPairingByPriCurAndSecCur("BTC","ETH");
        expect(pairing).to.be.a(Pairing);
        expect(pairing.getPrimary_currency()).to.eql("BTC"); 
        expect(pairing.getSecondary_currency()).to.eql("ETH"); 
    });
});

describe('HistoricalTrade', function() {
    //this.timeout(15000); 
    it('getHistoricalTrade', async () =>  {
        const historicalTrade = await HistoricalTrade.getHistoricalTrade(1,new Date())
        expect(historicalTrade).to.be.a(HistoricalTrade);
    });
});


describe('Trade', function() {
    //this.timeout(15000); 
    it('getTradesByPairingId', async () =>  {
        const trades = await Trade.getTradesByPairingId(1)
        expect(trades).to.be.an(Array);
        expect(trades[0]).to.be.a(Trade);
    });

    it('getHighbidByPairingId', async () =>  {
        const trades = await Trade.getHighbidByPairingId(1)
        expect(trades).to.be.an(Array);
        expect(trades[0]).to.be.a(Trade.Highbid);
    });

    it('getLowaskByPairingId', async () =>  {
        const lowask = await Trade.getLowaskByPairingId(1)
        expect(lowask).to.be.an(Array);
        expect(lowask[0]).to.be.a(Trade.Lowask);
    });

});