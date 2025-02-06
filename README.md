# Binance-Crypto-Dashboard
Binance Crypto Dashboard is leveraging the Binance API to handle live ticker data and implementing a real-time cryptocurrency dashboard

## Overview

This project is a real-time cryptocurrency dashboard built with Node.js, Next.js, and WebSocket. It:
- Retrieves 100 cryptocurrency trading pairs from the Binance API.
- Displays the pairs on the front end.
- Allows users to subscribe to real-time ticker updates via WebSocket.
- Provides detailed information for each pair (24h high, low, price change, and percentage change).

## Features

1. **Trading Pairs:**
   - Fetches 100 trading pairs from Binance.
   - Displays pairs on the front end.

2. **Live Ticker Data:**
   - Manages real-time WebSocket connections.
   - Subscribes to user-specific tickers and updates the UI with minimal latency.

3. **Detailed Pair Information:**
   - Shows 24h high, low, price change, and percentage change.
   - (Bonus) Real-time historical chart integration.

4. **User-Specific Subscriptions**
   - Clients can choose which pairs they want to receive updates for.

5. **Docker Support:**
   - Containerizes the application for easy deployment.
   - Ensures consistent environment across different setups.

6. **Scalability:**
   - Handles multiple WebSocket connections efficiently.
   - Ensures minimal latency and high throughput.

7. **User Experience:**
   - Intuitive and responsive UI/UX.
   - Real-time updates without page reloads.

## Getting Started

### Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SedatUygur/Binance-Crypto-Dashboard.git
   cd crypto-dashboard

2. **Install dependencies for both client and services:**
   ```bash
   npm install
   ```

3. **Docker Compose (Optional):**
   If you prefer to use Docker, you can build and run the application using Docker Compose. Make sure Docker and Docker Compose are installed on your machine. Then run:
   ```bash
   docker-compose up --build
   ```
   This command will build the Docker images and start the containers.

4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

### Usage

Once the application is running, you can:
- View the list of trading pairs.
- Subscribe to specific pairs to receive real-time updates.
- View detailed information about each pair, including historical data.
