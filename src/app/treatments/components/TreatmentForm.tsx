import React from 'react';
import { Treatment, Exercise } from '@/types';
import { usePatients } from '@/app/patients/hooks/usePatients';
import { ExerciseList } from './ExerciseList';
import { ObjectivesList } from './ObjectivesList';

interface TreatmentFormProps {
  onSubmit: (data: Partial<Treatment>) => void;
  initialData?: Treatment;
  onCancel: () => void;
}

export function TreatmentForm({ onSubmit, initialData, onCancel }: TreatmentFormProps) {
  const { patients } = usePatients();
  const [formData, setFormData] = React.useState<Partial<Treatment>>(
    initialData || {
      patientId: '',
      startDate: new Date().toISOString().split('T')[0],
      diagnosis: '',
      objectives: [],
      prescriptionDetails: '',
      sessions: []
    }
  );
  const [objectives, setObjectives] = React.useState<string[]>(initialData?.objectives || []);
  const [exercises, setExercises] = React.useState<Exercise[]>(
    initialData?.sessions[0]?.exercises || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      objectives,
      sessions: [{
        id: '1',
        treatmentId: '1',
        date: new Date().toISOString(),
        exercises,
        notes: '',
        progress: 0
      }]
    });
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient</label>
        <select
          value={formData.patientId}
          onChange={(e) => handleChange('patientId', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Sélectionner un patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.firstName} {patient.lastName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date de début</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Diagnostic</label>
        <textarea
          value={formData.diagnosis}
          onChange={(e) => handleChange('diagnosis', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <ObjectivesList
        objectives={objectives}
        onObjectivesChange={setObjectives}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Détails de la prescription</label>
        <textarea
          value={formData.prescriptionDetails}
          onChange={(e) => handleChange('prescriptionDetails', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <ExerciseList
        exercises={exercises}
        onExercisesChange={setExercises}
      />

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {initialData ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
}