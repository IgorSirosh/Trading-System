
import React from 'react';
import { StrategySettings, ExitStrategy } from '../types';

interface StrategyPanelProps {
  settings: StrategySettings;
  setSettings: React.Dispatch<React.SetStateAction<StrategySettings>>;
}

const StrategyPanel: React.FC<StrategyPanelProps> = ({ settings, setSettings }) => {
  const handleExitStrategyChange = (strategy: ExitStrategy) => {
    setSettings(prev => ({ ...prev, exitStrategy: strategy }));
  };

  const handleRsiChange = (type: 'reverseTrailing' | 'trailingStop', level: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setSettings(prev => ({
        ...prev,
        rsiThresholds: {
          ...prev.rsiThresholds,
          [type]: {
            ...prev.rsiThresholds[type],
            [level]: numValue,
          }
        }
      }))
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg h-full flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <h2 className="font-bold text-white">Strategy Configuration</h2>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto text-sm">
        <div>
          <label className="block text-gray-400 mb-2">Exit Strategy</label>
          <div className="flex bg-gray-700 rounded-md p-1">
            <button 
              onClick={() => handleExitStrategyChange(ExitStrategy.TrailingStop)}
              className={`flex-1 p-1 rounded-md text-xs font-bold transition ${settings.exitStrategy === ExitStrategy.TrailingStop ? 'bg-accent-blue text-white' : 'text-gray-400 hover:bg-gray-600'}`}>
              Trailing Stop
            </button>
            <button 
              onClick={() => handleExitStrategyChange(ExitStrategy.TakeProfit)}
              className={`flex-1 p-1 rounded-md text-xs font-bold transition ${settings.exitStrategy === ExitStrategy.TakeProfit ? 'bg-accent-blue text-white' : 'text-gray-400 hover:bg-gray-600'}`}>
              Take Profit
            </button>
          </div>
        </div>

        <div>
            <label htmlFor="baseOffset" className="block text-gray-400 mb-1">Base Offset (%)</label>
            <input 
                type="number"
                id="baseOffset"
                value={settings.baseOffset}
                onChange={e => setSettings(p => ({...p, baseOffset: parseFloat(e.target.value)}))}
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-2 focus:ring-accent-blue focus:border-accent-blue outline-none"
                step="0.1"
            />
        </div>

        <div>
            <h3 className="text-gray-200 font-semibold mb-2">Reverse Trailing (Entry)</h3>
            <div className="space-y-2">
            {Object.entries(settings.rsiThresholds.reverseTrailing).map(([level, offset]) => (
                <div key={level} className="flex items-center justify-between">
                    <label className="text-gray-400">RSI &le; {level}</label>
                    <input type="number" value={offset} onChange={e => handleRsiChange('reverseTrailing', level, e.target.value)} step="0.1" className="w-20 bg-gray-700 border border-gray-600 rounded-md p-1 text-right text-white outline-none focus:ring-1 focus:ring-accent-blue" />
                </div>
            ))}
            </div>
        </div>

        <div>
            <h3 className="text-gray-200 font-semibold mb-2">Trailing Stop (Exit)</h3>
            <div className="space-y-2">
            {Object.entries(settings.rsiThresholds.trailingStop).map(([level, offset]) => (
                <div key={level} className="flex items-center justify-between">
                    <label className="text-gray-400">RSI &ge; {level}</label>
                    <input type="number" value={offset} onChange={e => handleRsiChange('trailingStop', level, e.target.value)} step="0.1" className="w-20 bg-gray-700 border border-gray-600 rounded-md p-1 text-right text-white outline-none focus:ring-1 focus:ring-accent-blue" />
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyPanel;
