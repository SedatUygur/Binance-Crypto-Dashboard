import React from 'react';
import { useSubscription } from '@apollo/client';
import { TICKER_UPDATE } from '../graphql/operations';

interface TickerData {
  symbol: string;
  price: string;
  high24hr: string;
  low24hr: string;
  priceChange24hr: string;
  priceChangePercent24hr: string;
}

interface TickerSubscriptionProps {
  symbol: string;
}

/**
 * A React functional component that subscribes to real-time ticker updates for a given cryptocurrency symbol.
 * Utilizes Apollo Client's useSubscription hook to listen for ticker updates from a GraphQL subscription.
 * Displays loading, error, or ticker data based on the subscription's state.
 *
 * Props:
 * - symbol: The cryptocurrency symbol for which to receive ticker updates.
 *
 * Returns a JSX element displaying the latest ticker information including price, 24-hour high/low,
 * and 24-hour price change and percentage change. Shows a loading message while awaiting updates,
 * and an error message if the subscription encounters an error. If no data is received, a placeholder message is shown.
 */

const TickerSubscription: React.FC<TickerSubscriptionProps> = ({ symbol }) => {
  const { data, loading, error } = useSubscription<{ tickerUpdate: TickerData }>(TICKER_UPDATE, {
    variables: { symbol },
  });

  if (loading) return <p>Waiting for ticker updates...</p>;
  if (error) return <p>Error in ticker subscription: {error.message}</p>;

  // TODO: I want to throttle or debounce rapid updates.
  const ticker = data?.tickerUpdate;
  if (!ticker) return <p>No data received yet.</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <h3>Ticker Update for {ticker.symbol}</h3>
      <p>
        <strong>Price:</strong> {ticker.price}
      </p>
      <p>
        <strong>24hr High:</strong> {ticker.high24hr}
      </p>
      <p>
        <strong>24hr Low:</strong> {ticker.low24hr}
      </p>
      <p>
        <strong>24hr Price Change:</strong> {ticker.priceChange24hr}
      </p>
      <p>
        <strong>24hr Price % Change:</strong> {ticker.priceChangePercent24hr}
      </p>
    </div>
  );
};

export default TickerSubscription;