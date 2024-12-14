import React, { useState } from 'react';
import { MedicalRecord } from '@/features/medical-records/types';
import { usePatients } from '@/app/patients/hooks/usePatients';

interface DossierFormProps {
  onSubmit: (data: Partial<MedicalRecord>) => void;
  initialData?: MedicalRecord;
  onCancel: () => void;
}

export function DossierForm({ onSubmit, initialData, onCancel }: DossierFormProps) {
  const { patients } = usePatients();
  const [formData, setFormData] = useState<Partial<MedicalRecord>>(
    initialData || {
      patient: undefined,
      bloodType: '',
      allergies: [],
      medicalHistory: '',
      documents: [],
      treatments: [],
      notes: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient</label>
        <select
          value={formData.patient?.id}
          onChange={(e) => {
            const patient = patients.find(p => p.id === e.target.value);
            handleChange('patient', patient);
          }}
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
        <label className="block text-sm font-medium text-gray-700">Groupe sanguin</label>
        <select
          value={formData.bloodType}
          onChange={(e) => handleChange('bloodType', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Sélectionner</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Allergies</label>
        <textarea
          value={formData.allergies?.join(', ')}
          onChange={(e) => handleChange('allergies', e.target.value.split(',').map(s => s.trim()))}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Séparer les allergies par des virgules"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Antécédents médicaux</label>
        <textarea
          value={formData.medicalHistory}
          onChange={(e) => handleChange('medicalHistory', e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

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