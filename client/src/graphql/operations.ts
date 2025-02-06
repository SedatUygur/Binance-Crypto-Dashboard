import { gql } from '@apollo/client';

// Query to fetch the list of 100 trading pairs
export const GET_TRADING_PAIRS = gql`
  query GetTradingPairs {
    tradingPairs {
      symbol
      baseAsset
      quoteAsset
    }
  }
`;

// Query to fetch detailed information for a specific pair
export const GET_PAIR_DETAIL = gql`
  query GetPairDetail($symbol: String!) {
    pairDetail(symbol: $symbol) {
      symbol
      price
      high24hr
      low24hr
      priceChange24hr
      priceChangePercent24hr
    }
  }
`;

// Subscription for ticker updates on a specific pair
export const TICKER_UPDATE = gql`
  subscription OnTickerUpdate($symbol: String!) {
    tickerUpdate(symbol: $symbol) {
      symbol
      price
      high24hr
      low24hr
      priceChange24hr
      priceChangePercent24hr
    }
  }
`;