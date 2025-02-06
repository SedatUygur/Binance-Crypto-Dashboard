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