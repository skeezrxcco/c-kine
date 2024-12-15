/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '@/types';
import { usePatients } from '@/app/patients/hooks/usePatients';
import { TimeSelect } from './TimeSelect';
import { DurationSelect } from './DurationSelect';
import { AppointmentTypeSelect } from './AppointmentTypeSelect';
import { Prisma } from '@prisma/client';

interface AppointmentFormProps {
  onSubmit: (data:Omit<Prisma.AppointmentUncheckedCreateInput, 'createdAt' | 'updatedAt'>) => void;
  initialData?: Appointment;
  selectedDate: Date;
  onCancel: () => void;
}

export function AppointmentForm({ onSubmit, initialData, selectedDate, onCancel }: AppointmentFormProps) {
  const { patients } = usePatients();
  const [formData, setFormData] = React.useState<Omit<Prisma.AppointmentUncheckedCreateInput, 'createdAt' | 'updatedAt'>>(
    initialData || {
      patientId: '',
      datetime: selectedDate,
      duration: 30,
      type: 'FOLLOWUP',
      status: 'SCHEDULED',
      notes: '',
      kineId: 'cm4orl3u800012gv7g4t15m2g' // Added missing required kineId field
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData: Omit<Prisma.AppointmentUncheckedCreateInput, 'createdAt' | 'updatedAt'> = {
      ...formData,
      datetime: formData.datetime ? new Date(formData.datetime) : new Date()
    };
    onSubmit(submissionData);
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="text"
          value={format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
          disabled
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Patient
        </label>
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

      <div className="grid grid-cols-2 gap-4">
        <TimeSelect
          value={formData.datetime instanceof Date ? formData.datetime.getHours().toString().padStart(2, '0') + ':' + formData.datetime.getMinutes().toString().padStart(2, '0') : '09:00'}
          onChange={(time) => {
            const [hours, minutes] = time.split(':');
            const newDate = new Date(formData.datetime || new Date());
            newDate.setHours(parseInt(hours), parseInt(minutes));
            handleChange('datetime', newDate);
          }}
        />

        <DurationSelect
          value={formData.duration}
          onChange={(duration) => handleChange('duration', duration)}
        />
      </div>

      <AppointmentTypeSelect
        value={formData.type?.toLowerCase() as "followup" | "initial" | "final"}
        onChange={(type) => handleChange('type', type)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          value={formData.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
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