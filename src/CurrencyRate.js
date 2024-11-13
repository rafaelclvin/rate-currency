// src/CurrencyRate.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyRate = () => {
  const [rates, setRates] = useState([]);
  const apiKey = 'f76b541dd1ec46ed8c59c39504355769';

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=f76b541dd1ec46ed8c59c39504355769&base=USD`);
        const exchangeRates = response.data.rates;
        const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

        const ratesData = currencies.map(currency => {
          const rate = parseFloat(exchangeRates[currency]); 
          return {
            currency,
            weBuy: (rate * 1.05).toFixed(4),
            exchangeRate: rate.toFixed(4), 
            weSell: (rate * 0.95).toFixed(4), 
          };
        });

        setRates(ratesData);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };

    fetchRates();
  }, [apiKey]);

  return (
    <div>
      <h1>Currency Exchange Rates (based on 1 USD)</h1>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.currency}</td>
              <td>{rate.weBuy}</td>
              <td>{rate.exchangeRate}</td>
              <td>{rate.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyRate;