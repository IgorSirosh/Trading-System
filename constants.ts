
import { Subaccount, SubaccountStatus, ChartDataPoint, OrderBookEntry, Trade, StrategySettings, ExitStrategy, LogEntry } from './types';

export const INITIAL_SUBACCOUNTS: Subaccount[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Subaccount ${i + 1}`,
  capital: 10000,
  status: i < 3 ? SubaccountStatus.Pending : SubaccountStatus.Idle,
  realizedPnl: Math.random() * 500 - 100,
  activationPrice: 68000 - i * 500,
  ...(i === 0 && { status: SubaccountStatus.PositionOpen, entryPrice: 68250, positionSize: 0.146, unrealizedPnl: 150.75 }),
}));

export const INITIAL_CHART_DATA: ChartDataPoint[] = Array.from({ length: 100 }, (_, i) => {
  const price = 68000 + Math.sin(i * 0.2) * 200 + Math.random() * 100 - 50;
  return {
    time: `12:${(i % 60).toString().padStart(2, '0')}`,
    price: parseFloat(price.toFixed(2)),
    rsi: 30 + (price - 67800) / 400 * 40 + Math.random() * 5,
    vwap: price - 20 + Math.random() * 40,
  };
});

export const MOCK_ORDER_BOOK: { bids: OrderBookEntry[]; asks: OrderBookEntry[] } = {
  bids: Array.from({ length: 15 }, (_, i) => {
    const price = 68500.5 - i * 0.5;
    const size = Math.random() * 5;
    return { price, size, total: 0 };
  }).map((entry, i, arr) => ({ ...entry, total: arr.slice(0, i + 1).reduce((acc, curr) => acc + curr.size, 0) })),
  asks: Array.from({ length: 15 }, (_, i) => {
    const price = 68501.0 + i * 0.5;
    const size = Math.random() * 5;
    return { price, size, total: 0 };
  }).map((entry, i, arr) => ({ ...entry, total: arr.slice(0, i + 1).reduce((acc, curr) => acc + curr.size, 0) })),
};


export const MOCK_TRADES: Trade[] = Array.from({ length: 20 }, (_, i) => ({
    id: `trade-${i}-${Date.now()}`,
    price: 68500.5 + (Math.random() - 0.5),
    size: parseFloat((Math.random() * 0.5).toFixed(4)),
    time: new Date(Date.now() - i * 1000).toLocaleTimeString(),
    side: Math.random() > 0.5 ? 'buy' : 'sell',
}));


export const INITIAL_STRATEGY_SETTINGS: StrategySettings = {
  exitStrategy: ExitStrategy.TrailingStop,
  baseOffset: 0.5,
  rsiThresholds: {
    reverseTrailing: {
      33: 0.5,
      32: 0.4,
      31: 0.3,
      30: 0.2,
    },
    trailingStop: {
      68: 0.4,
      69: 0.3,
      70: 0.2,
    },
  },
};

export const INITIAL_LOG_ENTRIES: LogEntry[] = [
    { id: 1, timestamp: new Date().toLocaleTimeString(), subaccountId: 'Global', message: 'System initialized.', type: 'info' },
    { id: 2, timestamp: new Date().toLocaleTimeString(), subaccountId: 1, message: 'Position opened at 68250.00', type: 'success' },
    { id: 3, timestamp: new Date().toLocaleTimeString(), subaccountId: 'Global', message: 'RSI dropped below 33, adjusting reverse trailing offset.', type: 'warning' },
    { id: 4, timestamp: new Date().toLocaleTimeString(), subaccountId: 2, message: 'Pending activation at 67500.00', type: 'info' },
];
