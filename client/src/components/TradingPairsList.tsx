import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TRADING_PAIRS } from '../graphql/operations';

export interface TradingPair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

interface TradingPairsListProps {
  onSelectPair: (pair: TradingPair) => void;
}

/**
 * A React component that displays a list of trading pairs fetched from a GraphQL API.
 * The component allows users to filter the list by entering a search term.
 * Users can select a trading pair by clicking on it, invoking a callback function.
 *
 * Props:
 * - onSelectPair: A callback function that is triggered when a trading pair is selected.
 *
 * The component uses Apollo's useQuery hook to fetch the trading pairs and manages
 * the search term using React's useState hook. It filters the trading pairs based on
 * the search term using useMemo for optimization.
 */

const TradingPairsList: React.FC<TradingPairsListProps> = ({ onSelectPair }) => {
  const { loading, error, data } = useQuery(GET_TRADING_PAIRS);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter pairs based on search term
  const filteredPairs = useMemo(() => {
    if (!data || !data.tradingPairs) return [];
    return data.tradingPairs.filter((pair: TradingPair) =>
      pair.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  if (loading) return <p>Loading trading pairs...</p>;
  if (error) return <p>Error fetching trading pairs: {error.message}</p>;

  return (
    <div>
      <h2>Trading Pairs</h2>
      <input
        type="text"
        placeholder="Search pairs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />
      <ul>
        {filteredPairs.map((pair: TradingPair) => (
          <li key={pair.symbol}>
            <button onClick={() => onSelectPair(pair)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {pair.symbol} ({pair.baseAsset}/{pair.quoteAsset})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradingPairsList;