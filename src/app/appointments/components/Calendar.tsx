import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '../../../types';
import { AppointmentSlot } from './AppointmentSlot';

interface CalendarProps {
  appointments: Appointment[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onSelectAppointment: (appointment: Appointment) => void;
}

export function Calendar({ appointments, selectedDate, onSelectDate, onSelectAppointment }: CalendarProps) {
  const weekStart = startOfWeek(selectedDate, { locale: fr });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8h-19h

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-8 border-b">
        <div className="p-4 text-gray-500">Heures</div>
        {weekDays.map((day) => (
          <div
            key={day.toString()}
            className={`p-4 text-center cursor-pointer hover:bg-gray-50 ${
              isSameDay(day, selectedDate) ? 'bg-indigo-50' : ''
            }`}
            onClick={() => onSelectDate(day)}
          >
            <div className="font-medium">{format(day, 'EEEE', { locale: fr })}</div>
            <div className="text-sm text-gray-500">{format(day, 'd MMM', { locale: fr })}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="p-4 text-gray-500 text-sm border-r">
              {hour}:00
            </div>
            {weekDays.map((day) => (
              <div key={`${day}-${hour}`} className="border-b border-r p-2 min-h-[100px]">
                {appointments
                  .filter((apt) => {
                    const aptDate = new Date(apt.datetime);
                    return (
                      isSameDay(aptDate, day) &&
                      aptDate.getHours() === hour
                    );
                  })
                  .map((apt) => (
                    <AppointmentSlot
                      key={apt.id}
                      appointment={apt}
                      onClick={() => onSelectAppointment(apt)}
                    />
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}