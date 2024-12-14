import React from 'react';
import { FileText, Calendar, User, Paperclip } from 'lucide-react';
import { MedicalRecord } from '../types';
import { formatDate } from '@/utils/date';
import { DocumentList } from './DocumentList';
import { TreatmentHistory } from './TreatmentHistory';

interface MedicalRecordCardProps {
  record: MedicalRecord;
}

export function MedicalRecordCard({ record }: MedicalRecordCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={record.patient.photoUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
            alt={`${record.patient.firstName} ${record.patient.lastName}`}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {record.patient.firstName} {record.patient.lastName}
            </h3>
            <p className="text-sm text-gray-500">
              Né(e) le {formatDate(record.patient.dateOfBirth)}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-full">
            <FileText className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-full">
            <Paperclip className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Informations médicales</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="text-gray-500">Groupe sanguin:</span>{' '}
                {record.bloodType}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Allergies:</span>{' '}
                {record.allergies.join(', ') || 'Aucune'}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Antécédents:</span>{' '}
                {record.medicalHistory}
              </p>
            </div>
          </div>

          <DocumentList documents={record.documents} />
        </div>

        <div className="space-y-4">
          <TreatmentHistory treatments={record.treatments} />
          
          <div>
            <h4 className="font-medium mb-2">Notes de suivi</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 max-h-48 overflow-y-auto">
              {record.notes.map((note) => (
                <div key={note.id} className="text-sm border-b pb-2">
                  <p className="text-gray-500">{formatDate(note.date)}</p>
                  <p>{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}