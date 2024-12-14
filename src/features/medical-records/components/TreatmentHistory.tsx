import React from 'react';
import { Activity } from 'lucide-react';
import { Treatment } from '@/features/treatments/types';
import { formatDate } from '@/utils/date';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface TreatmentHistoryProps {
  treatments: Treatment[];
}

export function TreatmentHistory({ treatments }: TreatmentHistoryProps) {
  return (
    <div>
      <h4 className="font-medium mb-2">Historique des traitements</h4>
      <div className="bg-gray-50 p-4 rounded-lg space-y-3 max-h-48 overflow-y-auto">
        {treatments.map((treatment) => {
          const progress = Math.round(
            (treatment.sessions.filter(s => s.progress === 100).length /
              treatment.sessions.length) *
              100
          );

          return (
            <div key={treatment.id} className="p-2 hover:bg-gray-100 rounded">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium">{treatment.diagnosis}</p>
                  <p className="text-xs text-gray-500">
                    Début: {formatDate(treatment.startDate)}
                  </p>
                </div>
                <Activity className="w-4 h-4 text-gray-400" />
              </div>
              <ProgressBar progress={progress} />
            </div>
          );
        })}
      </div>
    </div>
  );
}