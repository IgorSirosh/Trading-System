
export enum SubaccountStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Active = 'Active',
  PositionOpen = 'Position Open',
}

export enum ExitStrategy {
  TrailingStop = 'Trailing Stop',
  TakeProfit = 'Take Profit',
}

export interface Subaccount {
  id: number;
  name: string;
  capital: number;
  status: SubaccountStatus;
  entryPrice?: number;
  positionSize?: number;
  unrealizedPnl?: number;
  realizedPnl: number;
  activationPrice: number;
}

export interface ChartDataPoint {
  time: string;
  price: number;
  rsi: number;
  vwap?: number;
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface Trade {
  id: string;
  price: number;
  size: number;
  time: string;
  side: 'buy' | 'sell';
}

export interface StrategySettings {
  exitStrategy: ExitStrategy;
  baseOffset: number;
  rsiThresholds: {
    reverseTrailing: { [key: number]: number };
    trailingStop: { [key: number]: number };
  };
}

export interface LogEntry {
  id: number;
  timestamp: string;
  subaccountId: number | 'Global';
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
