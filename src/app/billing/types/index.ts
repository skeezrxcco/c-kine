export interface Bill {
  id: string;
  patientId: string;
  sessionId: string;
  amount: number;
  status: 'pending' | 'paid' | 'rejected';
  date: string;
  paymentMethod?: string;
  insuranceDetails?: string;
  telTransmissionStatus?: 'pending' | 'sent' | 'accepted' | 'rejected';
  telTransmissionDate?: string;
  telTransmissionError?: string;
}