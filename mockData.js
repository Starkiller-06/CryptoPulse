// mockData.js - Initial Telemetry Dataset
export const INITIAL_ASSETS = [
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', category: 'LAYER1', price: 64250.00, change24h: 3.45, volume: 32500000000, isWatched: true },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', category: 'LAYER1', price: 3480.50, change24h: -1.20, volume: 18200000000, isWatched: true },
  { id: 'sol', symbol: 'SOL', name: 'Solana', category: 'LAYER1', price: 152.75, change24h: 8.65, volume: 6400000000, isWatched: false },
  { id: 'uni', symbol: 'UNI', name: 'Uniswap', category: 'DEFI', price: 11.20, change24h: 4.15, volume: 850000000, isWatched: false },
  { id: 'aave', symbol: 'AAVE', name: 'Aave', category: 'DEFI', price: 142.80, change24h: -0.85, volume: 420000000, isWatched: false },
  { id: 'mkr', symbol: 'MKR', name: 'Maker', category: 'DEFI', price: 2850.00, change24h: 2.10, volume: 190000000, isWatched: false },
  { id: 'link', symbol: 'LINK', name: 'Chainlink', category: 'INFRA', price: 18.40, change24h: 5.30, volume: 920000000, isWatched: true },
  { id: 'grt', symbol: 'GRT', name: 'The Graph', category: 'INFRA', price: 0.32, change24h: -3.40, volume: 140000000, isWatched: false },
  { id: 'fil', symbol: 'FIL', name: 'Filecoin', category: 'INFRA', price: 6.15, change24h: 1.05, volume: 210000000, isWatched: false },
  { id: 'avax', symbol: 'AVAX', name: 'Avalanche', category: 'LAYER1', price: 38.90, change24h: 6.40, volume: 1100000000, isWatched: false },
];

export const CATEGORIES = ['ALL', 'LAYER1', 'DEFI', 'INFRA'];