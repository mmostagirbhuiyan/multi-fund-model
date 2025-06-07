import React, { useState } from 'react';

interface Props {
  open: boolean;
  onSave: (name: string) => void;
  onClose: () => void;
}

const PlanNameModal: React.FC<Props> = ({ open, onSave, onClose }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed) {
      onSave(trimmed);
      setName('');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-80 shadow-xl space-y-4">
        <h3 className="text-lg font-semibold text-white">Save Plan</h3>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Plan name"
          className="w-full px-3 py-2 rounded bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm rounded bg-slate-700 text-slate-200 hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanNameModal;
