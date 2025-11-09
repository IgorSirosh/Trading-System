
import React from 'react';
import { Subaccount, SubaccountStatus } from '../types';
import { ChevronDownIcon, CheckCircleIcon, ClockIcon, PlayCircleIcon, CircleIcon } from './icons';

interface SubaccountsPanelProps {
  subaccounts: Subaccount[];
}

const statusConfig = {
    [SubaccountStatus.PositionOpen]: { icon: <PlayCircleIcon className="h-4 w-4 text-accent-blue" />, color: 'text-accent-blue', bg: 'bg-blue-900/20' },
    [SubaccountStatus.Active]: { icon: <CheckCircleIcon className="h-4 w-4 text-accent-green" />, color: 'text-accent-green', bg: 'bg-green-900/20' },
    [SubaccountStatus.Pending]: { icon: <ClockIcon className="h-4 w-4 text-yellow-400" />, color: 'text-yellow-400', bg: 'bg-yellow-900/20' },
    [SubaccountStatus.Idle]: { icon: <CircleIcon className="h-4 w-4 text-gray-600" />, color: 'text-gray-600', bg: '' },
};

const SubaccountRow: React.FC<{ subaccount: Subaccount }> = ({ subaccount }) => {
    const config = statusConfig[subaccount.status];
    const unrealizedPnl = subaccount.unrealizedPnl ?? 0;

    return (
        <tr className={`border-b border-gray-800 hover:bg-gray-800/50 text-xs transition-colors ${config.bg}`}>
            <td className="p-2 flex items-center space-x-2">
                {config.icon}
                <span className={`font-medium ${config.color}`}>{subaccount.name}</span>
            </td>
            <td className="p-2 text-right font-mono">${subaccount.capital.toFixed(2)}</td>
            <td className="p-2 text-right font-mono">
                <span className={unrealizedPnl >= 0 ? 'text-accent-green' : 'text-accent-red'}>
                    {unrealizedPnl.toFixed(2)}
                </span>
            </td>
            <td className="p-2 text-right font-mono">
                 <span className={subaccount.realizedPnl >= 0 ? 'text-gray-200' : 'text-accent-red'}>
                    {subaccount.realizedPnl.toFixed(2)}
                </span>
            </td>
            <td className="p-2 text-right font-mono text-gray-400">{subaccount.activationPrice.toFixed(2)}</td>
        </tr>
    );
};


const SubaccountsPanel: React.FC<SubaccountsPanelProps> = ({ subaccounts }) => {
  return (
    <div className="bg-gray-800 rounded-lg h-full flex flex-col">
      <div className="p-3 border-b border-gray-700 flex justify-between items-center">
        <h2 className="font-bold text-white">Subaccount Ladder</h2>
        <button className="text-gray-400 hover:text-white">
            <ChevronDownIcon className="h-5 w-5"/>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <table className="w-full">
            <thead className="sticky top-0 bg-gray-800">
                <tr className="text-left text-xs text-gray-400">
                    <th className="p-2 font-normal">Account</th>
                    <th className="p-2 font-normal text-right">Capital</th>
                    <th className="p-2 font-normal text-right">Unrealized</th>
                    <th className="p-2 font-normal text-right">Realized</th>
                    <th className="p-2 font-normal text-right">Activation</th>
                </tr>
            </thead>
            <tbody>
                {subaccounts.map(sub => <SubaccountRow key={sub.id} subaccount={sub} />)}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubaccountsPanel;
