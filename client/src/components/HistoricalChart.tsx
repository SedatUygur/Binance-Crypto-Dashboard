/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { fetchHistoricalData } from '../utils/binanceApi';

Chart.register(...registerables);

interface HistoricalChartProps {
  symbol: string;
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ symbol }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchHistoricalData(symbol);
        // Process the data to extract labels and values
        const labels = data.map((entry: any) => new Date(entry[0]).toLocaleDateString());
        const prices = data.map((entry: any) => parseFloat(entry[4])); // Use closing price

        setChartData({
          labels,
          datasets: [
            {
              label: `${symbol} Closing Price`,
              data: prices,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching historical data', error);
      }
    }
    getData();
  }, [symbol]);

  if (!chartData) return <p>Loading chart...</p>;

  return <Line data={chartData} />;
};

export default HistoricalChart;
