import React from 'react';

interface Props {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  numberInputClassName?: string;
  className?: string;
}

const SliderNumberInput: React.FC<Props> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  numberInputClassName = '',
  className = ''
}) => {
  const progress = ((value - min) / (max - min)) * 100;
  const sliderStyle = {
    background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${progress}%, #4c1d95 ${progress}%, #4c1d95 100%)`
  } as React.CSSProperties;

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? 0 : Number(e.target.value);
    onChange(val);
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleRangeChange}
        className="range-slider flex-1"
        style={sliderStyle}
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleNumberChange}
        className={`w-20 ${numberInputClassName}`}
      />
    </div>
  );
};

export default SliderNumberInput;
