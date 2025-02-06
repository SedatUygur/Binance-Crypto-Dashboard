'use client';

import React, { useState } from 'react';
import TradingPairsList, { TradingPair } from '../components/TradingPairsList';
import TickerSubscription from '../components/TickerSubscription';
import PairDetail from '../components/PairDetail';

export default function Home() {
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
        <h1>Crypto Dashboard</h1>
        {/* Display the list of 100 trading pairs with search/filter */}
        <TradingPairsList onSelectPair={(pair) => setSelectedPair(pair)} />

        {/* When a trading pair is selected, show its ticker subscription and details */}
        {selectedPair && (
          <section style={{ marginTop: '2rem' }}>
            <h2>Selected Pair: {selectedPair.symbol}</h2>
            <TickerSubscription symbol={selectedPair.symbol} />
            <PairDetail symbol={selectedPair.symbol} />
          </section>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
