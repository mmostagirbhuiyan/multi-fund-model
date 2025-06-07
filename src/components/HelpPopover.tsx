import React from 'react';
import { HelpCircle } from 'lucide-react';

interface Props {
  explanation: string;
  presets: number[];
  onSelect: (val: number) => void;
}

const HelpPopover: React.FC<Props> = ({ explanation, presets, onSelect }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative inline-block">
      <button type="button" onClick={() => setOpen(o => !o)} className="ml-1 text-slate-400 hover:text-white">
        <HelpCircle className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-64 bg-slate-800 text-slate-200 text-sm p-4 rounded-xl border border-slate-700">
          <p className="mb-2">{explanation}</p>
          <div className="flex gap-2">
            {presets.map(p => (
              <button
                key={p}
                onClick={() => { onSelect(p); setOpen(false); }}
                className="px-2 py-1 bg-slate-700 rounded hover:bg-slate-600"
              >
                {p}%
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpPopover;
