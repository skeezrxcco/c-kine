import React from 'react';
import { MedicalRecordCard } from './MedicalRecordCard';
import { useMedicalRecords } from '../hooks/useMedicalRecords';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export function MedicalRecordList() {
  const { records, isLoading, error } = useMedicalRecords();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <MedicalRecordCard key={record.id} record={record} />
      ))}
    </div>
  );
}