import axios from 'axios';

export async function fetchHistoricalData(symbol: string) {
  const now = Date.now();
  // Calculate timestamp for 1 month ago (approximately 30 days)
  const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
  
  // Binance API endpoint for klines (candlestick data)
  const url = 'https://api.binance.com/api/v3/klines';
  
  try {
    const response = await axios.get(url, {
      params: {
        symbol: symbol.toUpperCase(),
        interval: '1d',
        startTime: oneMonthAgo,
        endTime: now,
      },
    });
    return response.data; // returns an array of candlestick data
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}