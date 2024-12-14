export interface TeleClaim {
  id: string;
  patientId: string;
  sessionId: string;
  billId: string;
  transmissionDate: string;
  status: 'pending' | 'sent' | 'accepted' | 'rejected';
  amount: number;
  type: 'cpam' | 'mutuelle';
  rejectionReason?: string;
  paymentDate?: string;
  paymentAmount?: number;
  paymentReference?: string;
}

export interface TeleTransmissionStats {
  pendingCount: number;
  acceptedCount: number;
  rejectedCount: number;
  totalAmount: number;
  pendingAmount: number;
  acceptedAmount: number;
}

export interface TeleTransmissionBatch {
  id: string;
  date: string;
  claimCount: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  errorMessage?: string;
}