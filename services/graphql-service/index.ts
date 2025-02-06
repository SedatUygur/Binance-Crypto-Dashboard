const { ApolloServer, gql, PubSub } = require('apollo-server');
const Redis = require('ioredis');
const axios = require('axios');

const redisSubscriber = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});