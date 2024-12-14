import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Exercise } from '@/types';
import { ExerciseForm } from './ExerciseForm';

interface ExerciseListProps {
  exercises: Exercise[];
  onExercisesChange: (exercises: Exercise[]) => void;
}

export function ExerciseList({ exercises, onExercisesChange }: ExerciseListProps) {
  const [showForm, setShowForm] = useState(false);

  const handleAddExercise = (exercise: Exercise) => {
    onExercisesChange([...exercises, { ...exercise, id: Date.now().toString() }]);
    setShowForm(false);
  };

  const handleRemoveExercise = (id: string) => {
    onExercisesChange(exercises.filter(exercise => exercise.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium text-gray-700">Exercices</label>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Ajouter un exercice
        </button>
      </div>

      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="flex items-start space-x-2 bg-gray-50 p-3 rounded-md">
            <div className="flex-1">
              <h4 className="font-medium">{exercise.name}</h4>
              <p className="text-sm text-gray-600">{exercise.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                {exercise.sets} séries × {exercise.repetitions} répétitions
                ({exercise.duration} minutes)
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveExercise(exercise.id)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {showForm && (
          <ExerciseForm
            onSubmit={handleAddExercise}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}