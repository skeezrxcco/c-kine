import { Appointment } from '../types';

export const mockAppointments: Appointment[] = [
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
  {
    id: '2',
    patientId: '2',
    kineId: '1',
    datetime: '2024-03-20T10:00:00',
    duration: 45,
    type: 'initial',
    status: 'confirmed',
    notes: 'Bilan initial lombalgie'
  },
  {
    id: '3',
    patientId: '3',
    kineId: '1',
    datetime: '2024-03-20T14:30:00',
    duration: 30,
    type: 'followup',
    status: 'scheduled',
    notes: 'Suivi rééducation épaule'
  }
];