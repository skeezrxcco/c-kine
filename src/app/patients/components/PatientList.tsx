import React from 'react';
import { Patient } from '../../../types';
import { PatientCard } from './PatientCard';

interface PatientListProps {
  patients: Patient[];
}

export function PatientList({ patients }: PatientListProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
}