"use strict";
const request = require("request");
const _ = require("lodash");
class Pairing {
    
  constructor(pairing_id, primary_currency, secondary_currency) {
    this.pairing_id = pairing_id;
    this.primary_currency = primary_currency;
    this.secondary_currency = secondary_currency;
  }
  getPairing_id() {
    return this.pairing_id;
  }
  getPrimary_currency() {
    return this.primary_currency;
  }
  getSecondary_currency() {
    return this.secondary_currency;
  }

  static orm(value) {
    const pairing = new Pairing(
      value.pairing_id,
      value.primary_currency,
      value.secondary_currency
    );
    return pairing;
  }

  static callPairingAPI() {
    const options = {
      method: "GET",
      url: "https://bx.in.th/api/pairing/",
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

  static async getPairing() {
    const json = await this.callPairingAPI();
    const array = [];
    _.forOwn(json, (value, key) => {
      array.push(this.orm(value));
    });
    return array;
  }

  static async getPairingById(id) {
    const json = await this.callPairingAPI();
    return this.orm(json[id]);
  }

  static async getPairingByPrimaryCur(primary_currency) {
    const json = await this.callPairingAPI();
    const arrayOfPairing = [];
    const arrayOffilter = _.filter(json, o => {
      return (
        o.primary_currency.trim().toLowerCase() ===
        primary_currency.trim().toLowerCase()
      );
    });
    arrayOffilter.forEach(element => {
      arrayOfPairing.push(this.orm(element));
    });
    return arrayOfPairing;
  }

  static async getPairingBySecondaryCur(secondary_currency) {
    const json = await this.callPairingAPI();
    const arrayOfPairing = [];
    const arrayOffilter = _.filter(json, o => {
      return (
        o.secondary_currency.trim().toLowerCase() ===
        secondary_currency.trim().toLowerCase()
      );
    });
    arrayOffilter.forEach(element => {
      arrayOfPairing.push(this.orm(element));
    });
    return arrayOfPairing;
  }

  static async getPairingByPriCurAndSecCur(primary_currency,secondary_currency) {
    const json = await this.callPairingAPI();
    const value = _.find(json, {
      primary_currency: primary_currency.trim().toUpperCase(),
      secondary_currency: secondary_currency.trim().toUpperCase()
    });
    return this.orm(value);
  }
}

module.exports = Pairing;

