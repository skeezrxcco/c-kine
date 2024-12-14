import React from 'react';

interface TimeSelectProps {
  value: string;
  onChange: (time: string) => void;
}

export function TimeSelect({ value, onChange }: TimeSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Heure
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        {Array.from({ length: 22 }, (_, i) => i + 8).map((hour) => (
          <React.Fragment key={hour}>
            <option value={`${hour.toString().padStart(2, '0')}:00`}>
              {hour}:00
            </option>
            <option value={`${hour.toString().padStart(2, '0')}:30`}>
              {hour}:30
            </option>
          </React.Fragment>
        ))}
      </select>
    </div>
  );
}