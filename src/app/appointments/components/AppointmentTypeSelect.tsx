import React from 'react';

interface AppointmentTypeSelectProps {
  value?: 'initial' | 'followup' | 'final';
  onChange: (type: 'initial' | 'followup' | 'final') => void;
}

export function AppointmentTypeSelect({ value = 'followup', onChange }: AppointmentTypeSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Type de séance
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as 'initial' | 'followup' | 'final')}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="initial">Bilan initial</option>
        <option value="followup">Séance de suivi</option>
        <option value="final">Bilan final</option>
      </select>
    </div>
  );
}