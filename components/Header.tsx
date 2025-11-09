
import React from 'react';
import { SettingsIcon, ActivityIcon } from './icons';

interface HeaderProps {
  totalPnl: number;
  totalCapital: number;
}

const Header: React.FC<HeaderProps> = ({ totalPnl, totalCapital }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-accent-blue rounded-md">
           <ActivityIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">Futures Trading System</h1>
      </div>
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex flex-col items-end">
            <span className="text-gray-400">Total Capital</span>
            <span className="font-semibold text-white">${totalCapital.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-gray-400">Total Realized PnL</span>
            <span className={`font-semibold ${totalPnl >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                {totalPnl.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </span>
        </div>
        <button className="p-2 rounded-md hover:bg-gray-700 transition-colors">
            <SettingsIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;
