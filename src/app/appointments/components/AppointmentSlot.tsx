import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '../../../types';

interface AppointmentSlotProps {
  appointment: Appointment;
  onClick: () => void;
}

export function AppointmentSlot({ appointment, onClick }: AppointmentSlotProps) {
  const startTime = new Date(appointment.datetime);
  const durationInMinutes = appointment.duration;

  return (
    <div
      className={`rounded-lg p-2 mb-1 cursor-pointer transition-colors ${
        appointment.status
          ? 'bg-green-100 hover:bg-green-200' 
          : appointment.status === 'cancelled'
          ? 'bg-red-100 hover:bg-red-200'
          : 'bg-blue-100 hover:bg-blue-200'
      }`}
      style={{ height: `${durationInMinutes}px` }}
      onClick={onClick}
    >
      <div className="text-xs font-medium">
        {format(startTime, 'HH:mm', { locale: fr })}
      </div>
      <div className="text-xs truncate">Patient #{appointment.patientId}</div>
    </div>
  );
}