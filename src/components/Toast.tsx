import React from 'react';

interface Action {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

interface ToastProps {
  message: string;
  actions: Action[];
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, actions, onClose }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 shadow-xl flex items-center space-x-4">
      <span className="text-sm text-slate-200">{message}</span>
      {actions.map(a => (
        <button
          key={a.label}
          onClick={a.onClick}
          className={`${a.primary ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'} text-xs px-3 py-1 rounded`}
        >
          {a.label}
        </button>
      ))}
      <button onClick={onClose} className="text-slate-400 hover:text-white text-xs ml-2">✕</button>
    </div>
  );
};

export default Toast;
