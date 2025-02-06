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