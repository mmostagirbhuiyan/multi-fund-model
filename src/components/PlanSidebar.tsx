import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Plan } from '../types';

interface Props {
  plans: Plan[];
  open: boolean;
  onClose: () => void;
  onLoad: (plan: Plan) => void;
  onDelete: (name: string) => void;
  onCompare: (a: Plan, b: Plan) => void;
}

const PlanSidebar: React.FC<Props> = ({ plans, open, onClose, onLoad, onDelete, onCompare }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) => {
    setSelected(prev => {
      const exists = prev.includes(name);
      const next = exists ? prev.filter(n => n !== name) : [...prev, name];
      return next.slice(-2); // only keep last two selected
    });
  };

  const handleCompare = () => {
    if (selected.length === 2) {
      const [aName, bName] = selected;
      const a = plans.find(p => p.name === aName);
      const b = plans.find(p => p.name === bName);
      if (a && b) {
        onCompare(a, b);
        onClose();
      }
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${open ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-slate-900/95 z-40 shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
      <div className="p-4 flex justify-between items-center border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">My Plans</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
        {plans.length === 0 && (
          <div className="text-slate-400 text-sm space-y-1 p-2">
            <div className="font-medium text-slate-300">Your Plans Will Appear Here</div>
            <p>Run a calculation and save it to get started. You can then create other plans to compare different strategies.</p>
          </div>
        )}
        {plans.map(plan => (
          <div key={plan.name} className="flex items-center justify-between bg-slate-800/40 border border-slate-700/50 rounded-lg p-3">
            <label className="flex items-center gap-2 relative">
              <input
                type="checkbox"
                checked={selected.includes(plan.name)}
                onChange={() => toggle(plan.name)}
                className="peer appearance-none w-5 h-5 border border-slate-600 rounded-sm bg-slate-800 cursor-pointer checked:bg-gradient-to-br checked:from-blue-500 checked:to-purple-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              {selected.includes(plan.name) && (
                <Check className="w-3 h-3 text-white absolute left-1 top-1 pointer-events-none" />
              )}
              <span className="text-slate-200 text-sm ml-1">{plan.name}</span>
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => onLoad(plan)}
                className="text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 py-1 rounded-full shadow hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              >
                Load
              </button>
              <button
                onClick={() => onDelete(plan.name)}
                className="text-xs font-medium bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 py-1 rounded-full shadow hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-700 pb-6">
        <button
          disabled={selected.length !== 2}
          onClick={handleCompare}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-semibold py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          Compare
        </button>
      </div>
      </div>
    </>
  );
};

export default PlanSidebar;
