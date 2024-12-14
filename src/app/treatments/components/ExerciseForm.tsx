import React, { useState } from 'react';
import { Exercise } from '@/types';

interface ExerciseFormProps {
  onSubmit: (exercise: Exercise) => void;
  onCancel: () => void;
  initialData?: Exercise;
}

export function ExerciseForm({ onSubmit, onCancel, initialData }: ExerciseFormProps) {
  const [formData, setFormData] = useState<Partial<Exercise>>(
    initialData || {
      name: '',
      description: '',
      duration: 15,
      repetitions: 10,
      sets: 3
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Exercise);
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-md border">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom de l'exercice</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Séries</label>
          <input
            type="number"
            min="1"
            value={formData.sets}
            onChange={(e) => handleChange('sets', parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Répétitions</label>
          <input
            type="number"
            min="1"
            value={formData.repetitions}
            onChange={(e) => handleChange('repetitions', parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Durée (min)</label>
          <input
            type="number"
            min="1"
            value={formData.duration}
            onChange={(e) => handleChange('duration', parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-3 py-1 text-sm border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}