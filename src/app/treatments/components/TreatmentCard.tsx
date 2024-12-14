import React from 'react';
import { FileText, Calendar, Target, Activity, Edit, Trash2 } from 'lucide-react';
import { Treatment } from '@/types';
import { formatDate } from '@/utils/date';
import { ProgressBar } from './ProgressBar';

interface TreatmentCardProps {
  treatment: Treatment;
  onAction: (action: 'edit' | 'delete', treatment: Treatment) => void;
}

export function TreatmentCard({ treatment, onAction }: TreatmentCardProps) {
  const completedSessions = treatment.sessions.filter(s => s.progress === 100).length;
  const totalProgress = Math.round(
    (treatment.sessions.reduce((acc, s) => acc + s.progress, 0) / 
    (treatment.sessions.length * 100)) * 100
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{treatment.diagnosis}</h3>
          <p className="text-sm text-gray-500">
            Patient #{treatment.patientId}
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onAction('edit', treatment)}
            className="text-gray-400 hover:text-indigo-600"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onAction('delete', treatment)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div className="text-sm">
            <p className="text-gray-500">Début</p>
            <p className="font-medium">{formatDate(treatment.startDate)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-gray-400" />
          <div className="text-sm">
            <p className="text-gray-500">Séances</p>
            <p className="font-medium">{completedSessions}/{treatment.sessions.length}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-gray-400" />
          <div className="text-sm">
            <p className="text-gray-500">Progression</p>
            <p className="font-medium">{totalProgress}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium mb-2">Objectifs</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {treatment.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Progression globale</h4>
          <ProgressBar progress={totalProgress} />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between">
        <button className="text-sm text-indigo-600 hover:text-indigo-800">
          Voir les séances
        </button>
        <button className="text-sm text-indigo-600 hover:text-indigo-800">
          Ajouter une séance
        </button>
      </div>
    </div>
  );
}