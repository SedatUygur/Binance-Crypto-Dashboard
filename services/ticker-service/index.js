import axios from 'axios';
import Redis from 'ioredis';
import WebSocket from 'ws';

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
});

async function addUserSubscription(userId, symbol) {
  await redis.sadd(`user:${userId}:subscriptions`, symbol);
}

async function getUserSubscriptions(userId) {
  return await redis.smembers(`user:${userId}:subscriptions`);
}

// Number of trading pairs to fetch
const PAIR_COUNT = 100;
const REDIS_CHANNEL = 'tickerUpdates';

/**
 * Fetches historical candlestick data for a given cryptocurrency symbol
 * from Binance's API. The data covers a period of approximately one month
 * with a daily interval.
 *
 * @param {string} symbol - The cryptocurrency symbol (e.g., 'BTCUSDT') for 
 * which to retrieve historical data.
 *
 * @returns {Promise<Array>} A promise that resolves to an array containing 
 * Open-High-Low-Close (OHLC) data for each day within the specified period. 
 * Each entry is an array representing a day's candlestick data.
 *
 * If an error occurs during fetching, the function will throw an exception.
 */

export async function fetchHistoricalData(symbol) {
  const now = Date.now();
  // Calculate timestamp for 1 month ago (approx. 30 days)
  const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
  const response = await axios.get('https://api.binance.com/api/v3/klines', {
    params: {
      symbol: symbol.toUpperCase(),
      interval: '1d',
      startTime: oneMonthAgo,
      endTime: now,
    },
  });
  return response.data; // Each entry is an array with OHLC data
}

/**
 * Fetches a list of trading pairs that are currently available for trading on Binance.
 * Utilizes Binance's API to retrieve exchange information and filters active trading pairs.
 * Limits the number of pairs to a predefined count and converts symbols to lowercase.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of trading pair symbols.
 * If an error occurs during fetching, returns an empty array.
 */

async function fetchTradingPairs() {
    try {
        // Binance API endpoint to fetch exchange info
        const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
        const symbols = response.data.symbols
        .filter((s) => s.status === 'TRADING')
        .slice(0, PAIR_COUNT)
        .map((s) => s.symbol.toLowerCase()); // Binance expects lower-case symbols for streams

        console.log('Fetched trading pairs:', symbols);
        return symbols;
    } catch (err) {
        console.error('Error fetching trading pairs', err);
        return [];
    }
}

/**
 * Subscribes to a Binance WebSocket for a specific trading pair and publishes any
 * received ticker data to Redis under the 'tickerUpdates' channel.
 *
 * @param {string} pair - Trading pair symbol (e.g. btcusdt)
 *
 * @example
 * subscribeToTicker('btcusdt');
 */
function subscribeToTicker(pair) {
    // Binance’s WebSocket endpoint for individual ticker streams:
    // Example endpoint: wss://stream.binance.com:9443/ws/btcusdt@ticker
    const wsUrl = `wss://stream.binance.com:9443/ws/${pair}@ticker`;
    const ws = new WebSocket(wsUrl);
  
    ws.on('open', () => {
      console.log(`WebSocket connection open for ${pair}`);
    });
  
    ws.on('message', (data) => {
      try {
        const tickerData = JSON.parse(data);
        // Publish data to Redis
        redis.publish(REDIS_CHANNEL, JSON.stringify(tickerData));
      } catch (err) {
        console.error(`Error parsing ticker data for ${pair}:`, err);
      }
    });
  
    ws.on('error', (err) => {
      console.error(`WebSocket error for ${pair}:`, err);
    });
  
    ws.on('close', () => {
      console.log(`WebSocket closed for ${pair}. Reconnecting in 5s...`);
      setTimeout(() => subscribeToTicker(pair), 5000);
    });
}

/**
 * Initializes the ticker service by fetching available trading pairs and subscribing
 * to each pair's WebSocket stream. Any received ticker data is published to Redis
 * under the 'tickerUpdates' channel.
 *
 * @example
 * startTickerService();
 */
async function startTickerService() {
    const tradingPairs = await fetchTradingPairs();
  
    tradingPairs.forEach((pair) => {
      subscribeToTicker(pair);
    });
}
  
startTickerService();