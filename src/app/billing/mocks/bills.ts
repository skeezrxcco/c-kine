import { Bill } from '../types';

export const mockBills: Bill[] = [
  {
    id: '1',
    patientId: '1',
    sessionId: '1',
    amount: 50.00,
    status: 'paid',
    date: '2024-03-01',
    paymentMethod: 'Carte Bancaire',
    insuranceDetails: 'CPAM - 75%',
    telTransmissionStatus: 'accepted',
    telTransmissionDate: '2024-03-01T14:30:00'
  },
  {
    id: '2',
    patientId: '2',
    sessionId: '2',
    amount: 60.00,
    status: 'pending',
    date: '2024-03-02',
    insuranceDetails: 'CPAM - 75%',
    telTransmissionStatus: 'pending'
  }
];