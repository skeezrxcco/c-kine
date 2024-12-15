'use client'

import React from 'react';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '../../../types';
import { AppointmentSlot } from './AppointmentSlot';
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  appointments: Appointment[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onSelectAppointment: (appointment: Appointment) => void;
}

export function Calendar({ appointments, selectedDate, onSelectDate, onSelectAppointment }: CalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = React.useState(startOfWeek(selectedDate, { locale: fr }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8h-19h

  const goToPreviousWeek = () => {
    setCurrentWeekStart(prevWeekStart => subWeeks(prevWeekStart, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prevWeekStart => addWeeks(prevWeekStart, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center p-4 border-b">
        <button 
          onClick={goToPreviousWeek} 
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Semaine précédente"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-lg font-semibold">
          {format(currentWeekStart, 'MMMM yyyy', { locale: fr })}
        </div>
        <button 
          onClick={goToNextWeek} 
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Semaine suivante"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

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

