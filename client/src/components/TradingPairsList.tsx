import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GET_TRADING_PAIRS } from '../graphql/operations';

export interface TradingPair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

interface TradingPairsListProps {
  onSelectPair: (pair: TradingPair) => void;
}

const Container = styled.div`
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const PairButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

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
      pair.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  if (loading) return <p>Loading trading pairs...</p>;
  if (error) return <p>Error fetching trading pairs: {error.message}</p>;

  return (
    <Container>
      <Heading>Trading Pairs</Heading>
      <SearchInput
        type="text"
        placeholder="Search pairs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List className="flex flex-wrap justify-center">
        {filteredPairs.map((pair: TradingPair) => (
          <ListItem
            key={pair.symbol}
            className="m-2 w-full rounded-lg bg-gray-100 p-4 shadow-md sm:w-1/2 md:w-1/4 lg:w-1/6"
          >
            <PairButton onClick={() => onSelectPair(pair)}>
              {pair.symbol} ({pair.baseAsset}/{pair.quoteAsset})
            </PairButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TradingPairsList;
