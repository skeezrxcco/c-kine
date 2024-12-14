'use client';

import React from 'react';
import { Phone, Mail, MapPin, FileText } from 'lucide-react';
import { Patient } from '../../../types';
import { formatDate } from '../../../utils/date';

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-gray-500">
            Né(e) le {formatDate(patient.dateOfBirth)}
          </p>
        </div>
        <button className="text-indigo-600 hover:text-indigo-800">
          <FileText className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          {patient.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          {patient.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {patient.address}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Médecin traitant</span>
          <span className="font-medium">{patient.prescribingDoctor}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">N° Sécurité sociale</span>
          <span className="font-medium">{patient.socialSecurityNumber}</span>
        </div>
      </div>
    </div>
  );
}