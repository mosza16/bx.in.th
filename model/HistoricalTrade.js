"use strict";
const request = require("request");
const _ = require("lodash");
const format = require('date-fns').format;

class HistoricalTrade {
  constructor(avg, high, low,volume,open,close) {
    this.avg = avg;
    this.high = high;
    this.low = low;
    this.volume = volume;
    this.open = open;
    this.close = close;
  }
  static orm(value){
    return new HistoricalTrade(
        value.avg ,
        value.high ,
        value.low  ,
        value.volume ,
        value.open ,
        value.close ,
    )
  }

  static callHistoricalTradeAPI(pairing_id,date_format) {
    //date format yyyy-mm-dd
    const options = {
      method: "GET",
      url: "https://bx.in.th/api/tradehistory/?pairing="+pairing_id+"&date="+date_format,
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

  static async getHistoricalTrade(pairing_id,date){
    const date_format = format(date,'YYYY-MM-D')
    const json = await this.callHistoricalTradeAPI(pairing_id,date_format);
    if(json.success){
        return this.orm(json.data)
    }else{
        return undefined;
    }

  }
}
module.exports = HistoricalTrade;