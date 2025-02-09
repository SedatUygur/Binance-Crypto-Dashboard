'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import TradingPairsList, { TradingPair } from '../components/TradingPairsList';
import TickerSubscription from '../components/TickerSubscription';
import PairDetail from '../components/PairDetail';
import HistoricalChart from '../components/HistoricalChart';

import './globals.css';

const PageContainer = styled.main`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

export default function Home() {
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null);
  return (
    <PageContainer>
      <Title>Crypto Dashboard</Title>
      <TradingPairsList onSelectPair={(pair) => setSelectedPair(pair)} />

      {selectedPair && (
        <section>
          <TickerSubscription symbol={selectedPair.symbol} />
          <PairDetail symbol={selectedPair.symbol} />
          <HistoricalChart symbol={selectedPair.symbol} />
        </section>
      )}
    </PageContainer>
  );
}
