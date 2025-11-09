
import React from 'react';
import { LogEntry } from '../types';

interface LogPanelProps {
  entries: LogEntry[];
}

const LogPanel: React.FC<LogPanelProps> = ({ entries }) => {

  const typeColor: { [key: string]: string } = {
    info: 'text-gray-400',
    success: 'text-accent-green',
    warning: 'text-yellow-400',
    error: 'text-accent-red'
  }

  return (
    <div className="bg-gray-800 rounded-lg h-full flex flex-col">
      <div className="p-3 border-b border-gray-700 flex justify-between items-center">
        <h2 className="font-bold text-white">Event Log</h2>
        <div className="flex space-x-2">
            <button className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">JSON</button>
            <button className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">CSV</button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-2 text-xs font-mono">
        {entries.slice().reverse().map(entry => (
          <div key={entry.id} className="flex items-start mb-1">
            <span className="text-gray-500 mr-2">{entry.timestamp}</span>
            <span className={`font-semibold mr-2 ${typeColor[entry.type]}`}>
              [{typeof entry.subaccountId === 'number' ? `Sub-${entry.subaccountId}`: entry.subaccountId}]
            </span>
            <span className="text-gray-300 flex-1">{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogPanel;
