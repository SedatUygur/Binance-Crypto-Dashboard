import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GET_PAIR_DETAIL } from '../graphql/operations';

interface PairDetailProps {
  symbol: string;
}

const Container = styled.div`
  background: #fff;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  text-align: center;
`;

/**
 * A React functional component that displays detailed information for a
 * specific cryptocurrency trading pair, fetched from a GraphQL API.
 *
 * Props:
 * - symbol: The cryptocurrency symbol for which to receive detailed information.
 *
 * Returns a JSX element displaying the following information for the given
 * symbol:
 * - Price
 * - 24-hour high
 * - 24-hour low
 * - 24-hour price change
 * - 24-hour price percentage change
 *
 * If the data is still being fetched, shows a "Loading details..." message.
 * If there is an error fetching the data, shows an "Error loading details"
 * message. If no data is received, shows a "No details available" message.
 */
const PairDetail: React.FC<PairDetailProps> = ({ symbol }) => {
  const { data, loading, error } = useQuery(GET_PAIR_DETAIL, {
    variables: { symbol },
    pollInterval: 30000, // poll every 30 seconds for fresh data
  });

  if (loading) return <p>Loading details for {symbol}...</p>;
  if (error) return <p>Error loading details: {error.message}</p>;

  const detail = data?.pairDetail;
  if (!detail) return <p>No details available for {symbol}.</p>;

  return (
    <Container className="pair-detail">
      <p>
        <strong>Pair</strong> {detail.symbol}
      </p>
      <p>
        <strong>Price</strong> {detail.price}
      </p>
      <p>
        <strong>24hr High</strong> {detail.high24hr}
      </p>
      <p>
        <strong>24hr Low</strong> {detail.low24hr}
      </p>
      <p>
        <strong>24hr Price Change</strong> {detail.priceChange24hr}
      </p>
      <p>
        <strong>24hr Price % Change</strong> {detail.priceChangePercent24hr}
      </p>
    </Container>
  );
};

export default PairDetail;
