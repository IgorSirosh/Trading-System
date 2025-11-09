
import React from 'react';
import { OrderBookEntry, Trade } from '../types';

interface OrderBookPanelProps {
  orderBook: { bids: OrderBookEntry[]; asks: OrderBookEntry[] };
  trades: Trade[];
}

const OrderBookRow = ({ price, size, total, type, maxTotal }: OrderBookEntry & { type: 'bid' | 'ask', maxTotal: number }) => {
    const colorClass = type === 'bid' ? 'text-accent-green' : 'text-accent-red';
    const bgClass = type === 'bid' ? 'bg-green-800/20' : 'bg-red-800/20';
    const bgWidth = (total / maxTotal) * 100;

    return (
        <tr className="text-xs relative font-mono hover:bg-gray-700/50">
            <td className={`p-1 ${colorClass}`}>{price.toFixed(2)}</td>
            <td className="p-1 text-right text-white">{size.toFixed(4)}</td>
            <td className="p-1 text-right text-gray-400">{total.toFixed(4)}</td>
            <div className={`absolute top-0 bottom-0 left-0 ${bgClass} transition-all duration-300`} style={{ width: `${bgWidth}%`, zIndex: 0 }}></div>
        </tr>
    );
};

const TradeRow = ({ price, size, time, side }: Trade) => {
    const colorClass = side === 'buy' ? 'text-accent-green' : 'text-accent-red';
    return (
        <tr className="text-xs font-mono hover:bg-gray-700/50">
            <td className={`p-1 ${colorClass}`}>{price.toFixed(2)}</td>
            <td className="p-1 text-right text-white">{size.toFixed(4)}</td>
            <td className="p-1 text-right text-gray-400">{time}</td>
        </tr>
    );
};


const OrderBookPanel: React.FC<OrderBookPanelProps> = ({ orderBook, trades }) => {
    const maxTotal = Math.max(orderBook.bids[orderBook.bids.length-1]?.total || 0, orderBook.asks[orderBook.asks.length-1]?.total || 0)
  
    return (
        <div className="bg-gray-800 rounded-lg h-full flex flex-col">
            <div className="p-3 border-b border-gray-700">
                <h2 className="font-bold text-white">Market Data</h2>
            </div>
            <div className="flex-grow overflow-y-auto" style={{ maxHeight: 'calc(50% - 40px)'}}>
                <table className="w-full">
                    <thead className="sticky top-0 bg-gray-800">
                        <tr className="text-left text-xs text-gray-400">
                            <th className="p-1 font-normal">Price (USDT)</th>
                            <th className="p-1 font-normal text-right">Size (BTC)</th>
                            <th className="p-1 font-normal text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderBook.asks.slice().reverse().map(ask => <OrderBookRow key={ask.price} {...ask} type="ask" maxTotal={maxTotal}/>)}
                    </tbody>
                </table>
                <div className="text-lg font-bold p-2 text-center text-accent-green my-1 border-y border-gray-700">
                    {orderBook.asks[0]?.price.toFixed(2)}
                </div>
                 <table className="w-full">
                    <tbody>
                        {orderBook.bids.map(bid => <OrderBookRow key={bid.price} {...bid} type="bid" maxTotal={maxTotal}/>)}
                    </tbody>
                </table>
            </div>
             <div className="p-3 border-b border-t border-gray-700">
                <h2 className="font-bold text-white">Recent Trades</h2>
            </div>
            <div className="flex-grow overflow-y-auto" style={{ maxHeight: 'calc(50% - 40px)'}}>
                 <table className="w-full">
                    <tbody>
                         {trades.map(trade => <TradeRow key={trade.id} {...trade} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderBookPanel;
