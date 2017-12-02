"use strict";
const request = require("request");
const _ = require("lodash");
class Trade{
    constructor(trade_id,rate,amount,trade_date,order_id,trade_type,reference_id,seconds){
        this.trade_id= trade_id;
        this.rate = rate;
        this.amount = amount;
        this.trade_date = new Date(trade_date);
        this.order_id = order_id;
        this.trade_type = trade_type;
        this.reference_id = reference_id;
        this.seconds = seconds;
    }

    static orm(value){
        return new Trade(value.trade_id
            ,value.rate
            ,value.amount
            ,value.trade_date
            ,value.order_id
            ,value.trade_type
            ,value.reference_id
            ,value.seconds)
    }

    static callTradeAPI(pairing_id) {
        const options = {
          method: "GET",
          url: "https://bx.in.th/api/trade/?pairing="+pairing_id,
          headers: {
            "cache-control": "no-cache"
          }
        };
        return new Promise((resovle, reject) => {
          request(options, (error, response, body) => {
            if (error) throw new Error(error);
            resovle(JSON.parse(body));
          });
        });
    }

    static async getTradesByPairingId(pairing_id){
         const trades = [];
         const array = await this.callTradeAPI(pairing_id);
         array["trades"].forEach(element => {
            trades.push(this.orm(element))
         });
         return trades
    }

    static async getHighbidByPairingId(pairing_id){
        const highbid = [];
        const array = await this.callTradeAPI(pairing_id);
        array["highbid"].forEach(element => {
            highbid.push(this.Highbid.orm(element))
           
        });
        return highbid
    }

    static async getLowaskByPairingId(pairing_id){
        const lowask = [];
        const array = await this.callTradeAPI(pairing_id);
        array["lowask"].forEach(element => {
            lowask.push(this.Lowask.orm(element))
        });
        return lowask
    }

    
}

//instantiated  Class
Trade.Highbid = class {
    constructor(order_id,rate,amount,date_added,order_type,display_vol1,display_vol2){
        this.order_id= order_id;
        this.rate = rate;
        this.amount = amount;
        this.date_added = new Date(date_added);
        this.order_type = order_type;
        this.display_vol1 = display_vol1;
        this.display_vol2 = display_vol2;
    }
    static orm(value){
        return new Trade.Highbid(value.order_id
            ,value.rate
            ,value.amount
            ,value.date_added
            ,value.order_type
            ,value.display_vol1
            ,value.display_vol2)
    }
}

Trade.Lowask = class {
    constructor(order_id,rate,amount,date_added,order_type,display_vol1,display_vol2){
        this.order_id= order_id;
        this.rate = rate;
        this.amount = amount;
        this.date_added = new Date(date_added);
        this.order_type = order_type;
        this.display_vol1 = display_vol1;
        this.display_vol2 = display_vol2;
    }
    static orm(value){
        return new Trade.Lowask(value.order_id
            ,value.rate
            ,value.amount
            ,value.date_added
            ,value.order_type
            ,value.display_vol1
            ,value.display_vol2)
    }
}



module.exports = Trade;