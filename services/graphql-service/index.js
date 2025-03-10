import { ApolloServer } from '@apollo/server';
import { PubSub } from 'graphql-subscriptions';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';
import Redis from 'ioredis';
import 'dotenv/config';

const REDIS_CHANNEL = 'tickerUpdates';
const TICKER_TOPIC = 'TICKER_TOPIC';

const pubsub = new PubSub();

const redisSubscriber = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

async function addUserSubscription(userId, symbol) {
  await redisSubscriber.sadd(`user:${userId}:subscriptions`, symbol);
}

async function getUserSubscriptions(userId) {
  return await redis.smembers(`user:${userId}:subscriptions`);
}

// Schema Definition
const typeDefs = `#graphql
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
    tradingPairs(filter: String): [TradingPair!]!
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
      tradingPairs: async (_, { filter }) => {
        // Fetch trading pair info from Binance API
        try {
          const response = await axios.get(process.env.BINANCE_EXCHANGE_INFO);
          // Filter for trading pairs and slice the first 100
          let pairs = response.data.symbols.filter(s => s.status === 'TRADING').slice(0, 100);
          if (filter) {
            pairs = pairs.filter(pair =>
              pair.symbol.toLowerCase().includes(filter.toLowerCase())
            );
          }
          return pairs.map(s => ({
            symbol: s.symbol,
            baseAsset: s.baseAsset,
            quoteAsset: s.quoteAsset,
          }));
        } catch (err) {
          console.error(err);
          return [];
        }
      },
      /**
       * Fetches detailed information for a specific cryptocurrency trading pair.
       * Utilizes Binance's API to retrieve exchange information.
       *
       * @param {String} symbol The cryptocurrency symbol for which to receive detailed information.
       *
       * @returns {Promise<Ticker>} A promise that resolves to an object with the following properties:
       * - symbol: The cryptocurrency symbol.
       * - price: The latest ticker price.
       * - high24hr: The highest price in the past 24 hours.
       * - low24hr: The lowest price in the past 24 hours.
       * - priceChange24hr: The price change in the past 24 hours.
       * - priceChangePercent24hr: The price change percentage in the past 24 hours.
       *
       * If an error occurs during fetching, returns null.
       */
      pairDetail: async (_, { symbol }) => {
        // To get detailed ticker info, use Binance’s 24hr ticker price change API
        try {
          const response = await axios.get(
            `${process.env.BINANCE_TICKER_24HR}?symbol=${symbol.toUpperCase()}`
          );
          const data = response.data;
          return {
            symbol: data.symbol,
            price: data.lastPrice,
            high24hr: data.highPrice,
            low24hr: data.lowPrice,
            priceChange24hr: data.priceChange,
            priceChangePercent24hr: data.priceChangePercent,
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    },
    Subscription: {
        tickerUpdate: {
        /**
         * Subscribes to a channel that receives all ticker updates, and
         * filters them by the requested symbol.
         *
         * @param {Object} _ Parent object, not used.
         * @param {Object} args The arguments passed to the subscription.
         * @param {string} args.symbol The symbol for which to receive ticker updates.
         *
         * @returns {AsyncIterator<Ticker>} An async iterator over the ticker updates
         * for the requested symbol.
         */
          subscribe: async (_, __, context) => {
            // Assume context carries user ID from authentication middleware
            const subscriptions = await getUserSubscriptions(context.userId);
            // Use a filtering mechanism on PubSub to only forward messages matching subscriptions
            return pubsub.asyncIterator(TICKER_TOPIC);
          },
        /**
         * Called for each message published to the channel. Filters the message
         * based on the requested symbol, and returns the message if it matches
         * the symbol, or null if it does not match.
         *
         * @param {Ticker} payload The message payload.
         * @param {Object} args The arguments passed to the subscription.
         * @param {string} args.symbol The symbol for which to receive ticker updates.
         *
         * @returns {Ticker | null} The filtered message, or null if it does not match
         * the requested symbol.
         */
          resolve: (payload, args, context) => {
            // Filter for the requested symbol.
            // Only send update if symbol is in user's subscriptions
            if (!args.symbol || (context.userSubscriptions.includes(payload.symbol) && payload.symbol.toLowerCase() === args.symbol.toLowerCase())) {
              return payload;
            }
            return null; // or skip if I want to filter out non-matching updates
          },
        },
    },
};

// Subscribe to Redis channel and forward to Apollo’s PubSub
redisSubscriber.subscribe(REDIS_CHANNEL, (err, count) => {
    if (err) {
      console.error('Failed to subscribe: %s', err.message);
    } else {
      console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
    }
});

redisSubscriber.on('message', (channel, message) => {
    if (channel === REDIS_CHANNEL) {
      try {
        const tickerData = JSON.parse(message);
        // Publish to Apollo PubSub
        pubsub.publish(TICKER_TOPIC, tickerData);
      } catch (err) {
        console.error('Error parsing ticker data from Redis:', err);
      }
    }
});

// Create the Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
      path: '/subscriptions',
    },
});

// Start the server
const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);