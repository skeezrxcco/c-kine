'use client';

import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, User, FileText, Check, X } from 'lucide-react';
import { Appointment } from '../../../types';

interface AppointmentDetailsProps {
  appointment: Appointment;
}

export function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-lg font-semibold">Détails du rendez-vous</h2>
        <div className="flex space-x-2">
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
            <Check className="w-5 h-5" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <div className="font-medium">
              {format(new Date(appointment.datetime), 'EEEE d MMMM yyyy', { locale: fr })}
            </div>
            <div className="text-sm text-gray-500">
              {format(new Date(appointment.datetime), 'HH:mm', { locale: fr })} - 
              {format(new Date(appointment.datetime).setMinutes(
                new Date(appointment.datetime).getMinutes() + appointment.duration
              ), 'HH:mm', { locale: fr })}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-400" />
          <div>
            <div className="font-medium">Patient #{appointment.patientId}</div>
            <div className="text-sm text-gray-500">
              {appointment.type === 'initial' ? 'Bilan initial' :
               appointment.type === 'followup' ? 'Séance de suivi' : 'Bilan final'}
            </div>
          </div>
        </div>

        {appointment.notes && (
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <div>
              <div className="font-medium">Notes</div>
              <div className="text-sm text-gray-500">{appointment.notes}</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t">
        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Modifier le rendez-vous
        </button>
      </div>
    </div>
  );
}