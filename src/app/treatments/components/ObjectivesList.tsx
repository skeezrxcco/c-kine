import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface ObjectivesListProps {
  objectives: string[];
  onObjectivesChange: (objectives: string[]) => void;
}

export function ObjectivesList({ objectives, onObjectivesChange }: ObjectivesListProps) {
  const [newObjective, setNewObjective] = useState('');

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      onObjectivesChange([...objectives, newObjective.trim()]);
      setNewObjective('');
    }
  };

  const handleRemoveObjective = (index: number) => {
    onObjectivesChange(objectives.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Objectifs</label>
      <div className="mt-1 space-y-2">
        {objectives.map((objective, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="flex-1 p-2 bg-gray-50 rounded-md">{objective}</span>
            <button
              type="button"
              onClick={() => handleRemoveObjective(index)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            placeholder="Ajouter un objectif"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddObjective}
            className="p-2 text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}