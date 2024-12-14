import React from 'react';
import { Treatment } from '@/types';
import { TreatmentCard } from './TreatmentCard';

interface TreatmentListProps {
  treatments: Treatment[];
  onTreatmentAction: (action: 'edit' | 'delete', treatment: Treatment) => void;
}

export function TreatmentList({ treatments, onTreatmentAction }: TreatmentListProps) {
  return (
    <div className="space-y-4">
      {treatments.map((treatment) => (
        <TreatmentCard 
          key={treatment.id} 
          treatment={treatment}
          onAction={onTreatmentAction}
        />
      ))}
    </div>
  );
}