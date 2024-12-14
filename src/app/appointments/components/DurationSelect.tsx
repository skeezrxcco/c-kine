import React from 'react';

interface DurationSelectProps {
  value?: number;
  onChange: (duration: number) => void;
}

export function DurationSelect({ value = 30, onChange }: DurationSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Durée
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value={30}>30 minutes</option>
        <option value={45}>45 minutes</option>
        <option value={60}>1 heure</option>
      </select>
    </div>
  );
}