'use client';

import React from 'react';
import { Appointment } from '../../types';

export function AppointmentList() {
  const appointments: Appointment[] = [
    {
      id: '1',
      patientId: '1',
      kineId: '1',
      datetime: '2024-03-20T09:00:00',
      duration: 30,
      type: 'followup',
      status: 'scheduled',
      notes: 'Rééducation genou droit'
    },
    // ... autres rendez-vous
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Prochains rendez-vous</h3>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}

interface AppointmentCardProps {
  appointment: Appointment;
}

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const time = new Date(appointment.datetime).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">{time}</p>
          <p className="text-gray-600">Patient #{appointment.patientId}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          appointment.type === 'initial' ? 'bg-blue-100 text-blue-800' :
          appointment.type === 'followup' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {appointment.type === 'initial' ? 'Bilan initial' :
           appointment.type === 'followup' ? 'Suivi' : 'Bilan final'}
        </span>
      </div>
    </div>
  );
}