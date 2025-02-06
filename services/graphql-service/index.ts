const { ApolloServer, gql, PubSub } = require('apollo-server');
const Redis = require('ioredis');
const axios = require('axios');

const redisSubscriber = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

// Schema Definition
const typeDefs = gql`
  type TradingPair {
    symbol: String!
    baseAsset: String
    quoteAsset: String
  }

  type Ticker {
    symbol: String!
    price: String
    high24hr: String
    low24hr: String
    priceChange24hr: String
    priceChangePercent24hr: String
  }

  type Query {
    tradingPairs: [TradingPair!]!
    pairDetail(symbol: String!): Ticker
  }

  type Subscription {
    tickerUpdate(symbol: String!): Ticker
  }
`;

// Resolvers
const resolvers = {
    Query: {
      /**
       * Fetches a list of trading pairs that are currently available for trading on Binance.
       * Utilizes Binance's API to retrieve exchange information and filters active trading pairs.
       * Limits the number of pairs to a predefined count and converts symbols to lowercase.
       *
       * @returns {Promise<TradingPair[]>} A promise that resolves to an array of trading pair symbols.
       * If an error occurs during fetching, returns an empty array.
       */
      tradingPairs: async () => {
        // Fetch trading pair info from Binance API
        try {
          const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
          // Filter for trading pairs and slice the first 100
          const pairs = response.data.symbols
            .filter((s) => s.status === 'TRADING')
            .slice(0, 100)
            .map((s) => ({
              symbol: s.symbol,
              baseAsset: s.baseAsset,
              quoteAsset: s.quoteAsset,
            }));
          return pairs;
        } catch (err) {
          console.error(err);
          return [];
        }
      },
    },
  };