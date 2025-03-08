/* eslint-disable @typescript-eslint/no-explicit-any */
// client/src/components/SpotMarketGrid.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import styled from 'styled-components';
import { GET_TRADING_PAIRS, ALL_TICKER_UPDATES } from '../graphql/operations';

interface TradingPair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

interface TickerData {
  symbol: string;
  price: string;
  high24hr: string;
  low24hr: string;
  priceChange24hr: string;
  priceChangePercent24hr: string;
}

// Styled components for the grid layout
const Container = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: #f5f5f5;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #fafafa;
  }
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
`;

const SpotMarketGrid: React.FC = () => {
  // Fetch static trading pairs from the API (first 100)
  const { loading, error, data } = useQuery(GET_TRADING_PAIRS);
  // Subscribe to ticker updates for all pairs
  const { data: subscriptionData } = useSubscription(ALL_TICKER_UPDATES);

  // Map to store latest ticker data for each symbol
  const [tickerMap, setTickerMap] = useState<{ [symbol: string]: TickerData }>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Update ticker map when new subscription data is received
  useEffect(() => {
    if (subscriptionData && subscriptionData.tickerUpdate) {
      setTickerMap((prev) => ({
        ...prev,
        [subscriptionData.tickerUpdate.symbol]: subscriptionData.tickerUpdate,
      }));
    }
  }, [subscriptionData]);

  // Combine static trading pairs with live ticker updates
  const pairs = useMemo(() => {
    if (!data || !data.tradingPairs) return [];
    return data.tradingPairs.map((pair: TradingPair) => {
      const ticker = tickerMap[pair.symbol];
      return {
        ...pair,
        ...ticker, // Merge in ticker data if available
      };
    });
  }, [data, tickerMap]);

  // Filter pairs based on search term
  const filteredPairs = useMemo(() => {
    return pairs.filter((pair: any) =>
      pair.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pairs, searchTerm]);

  if (loading) return <p>Loading pairs...</p>;
  if (error) return <p>Error loading pairs: {error.message}</p>;

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search for a pair..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Symbol</TableHeader>
            <TableHeader>Last Price</TableHeader>
            <TableHeader>24h Change</TableHeader>
            <TableHeader>24h High</TableHeader>
            <TableHeader>24h Low</TableHeader>
            <TableHeader>% Change</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {filteredPairs.map((pair: any) => (
            <TableRow key={pair.symbol}>
              <TableCell>{pair.symbol}</TableCell>
              <TableCell>{pair.price || '-'}</TableCell>
              <TableCell>{pair.priceChange24hr || '-'}</TableCell>
              <TableCell>{pair.high24hr || '-'}</TableCell>
              <TableCell>{pair.low24hr || '-'}</TableCell>
              <TableCell>
                {pair.priceChangePercent24hr ? `${pair.priceChangePercent24hr}%` : '-'}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SpotMarketGrid;
