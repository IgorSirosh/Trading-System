
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SubaccountsPanel from './SubaccountsPanel';
import ChartPanel from './ChartPanel';
import OrderBookPanel from './OrderBookPanel';
import StrategyPanel from './StrategyPanel';
import LogPanel from './LogPanel';
import { Subaccount, ChartDataPoint, OrderBookEntry, Trade, StrategySettings, LogEntry } from '../types';
import { INITIAL_SUBACCOUNTS, INITIAL_CHART_DATA, MOCK_ORDER_BOOK, MOCK_TRADES, INITIAL_STRATEGY_SETTINGS, INITIAL_LOG_ENTRIES } from '../constants';

const Dashboard: React.FC = () => {
    const [subaccounts, setSubaccounts] = useState<Subaccount[]>(INITIAL_SUBACCOUNTS);
    const [chartData, setChartData] = useState<ChartDataPoint[]>(INITIAL_CHART_DATA);
    const [orderBook, setOrderBook] = useState<{ bids: OrderBookEntry[]; asks: OrderBookEntry[] }>(MOCK_ORDER_BOOK);
    const [trades, setTrades] = useState<Trade[]>(MOCK_TRADES);
    const [strategySettings, setStrategySettings] = useState<StrategySettings>(INITIAL_STRATEGY_SETTINGS);
    const [logEntries, setLogEntries] = useState<LogEntry[]>(INITIAL_LOG_ENTRIES);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate chart data update
            setChartData(prevData => {
                const lastPoint = prevData[prevData.length - 1];
                const newPrice = lastPoint.price + (Math.random() - 0.5) * 20;
                const newRsi = 30 + (newPrice - 67800) / 400 * 40 + Math.random() * 5;
                const newPoint: ChartDataPoint = {
                    time: new Date().toLocaleTimeString().split(' ')[0],
                    price: parseFloat(newPrice.toFixed(2)),
                    rsi: parseFloat(newRsi.toFixed(2)),
                    vwap: newPrice - 20 + Math.random() * 40,
                };
                return [...prevData.slice(1), newPoint];
            });

            // Simulate trades
            setTrades(prevTrades => {
                const newTrade: Trade = {
                    id: `trade-${Date.now()}`,
                    price: chartData[chartData.length - 1].price + (Math.random() - 0.5),
                    size: parseFloat((Math.random() * 0.5).toFixed(4)),
                    time: new Date().toLocaleTimeString(),
                    side: Math.random() > 0.5 ? 'buy' : 'sell',
                };
                return [newTrade, ...prevTrades.slice(0, 19)];
            });
        }, 2000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartData]);

    const totalPnl = subaccounts.reduce((acc, sub) => acc + sub.realizedPnl, 0);
    const totalCapital = subaccounts.reduce((acc, sub) => acc + sub.capital, 0);

    return (
        <div className="flex flex-col h-screen">
            <Header totalPnl={totalPnl} totalCapital={totalCapital} />
            <main className="flex-grow p-2 grid grid-cols-12 grid-rows-6 gap-2">
                <div className="col-span-12 lg:col-span-3 row-span-6">
                    <SubaccountsPanel subaccounts={subaccounts} />
                </div>
                <div className="col-span-12 lg:col-span-6 row-span-4">
                    <ChartPanel data={chartData} />
                </div>
                <div className="col-span-12 lg:col-span-3 row-span-3">
                    <OrderBookPanel orderBook={orderBook} trades={trades} />
                </div>
                 <div className="col-span-12 lg:col-span-3 row-span-3">
                    <StrategyPanel settings={strategySettings} setSettings={setStrategySettings} />
                </div>
                <div className="col-span-12 lg:col-span-6 row-span-2">
                    <LogPanel entries={logEntries} />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
