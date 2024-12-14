import { useState } from 'react';
import { TeleClaim, TeleTransmissionStats } from '@/types/teletransmission';
import { PaymentTransaction } from '@/features/payments/types';

const mockClaims: TeleClaim[] = [
  {
    id: '1',
    patientId: '1',
    sessionId: '1',
    billId: '1',
    transmissionDate: '2024-03-20T10:00:00',
    status: 'accepted',
    amount: 50.00,
    type: 'cpam',
    paymentDate: '2024-03-22T14:30:00',
    paymentAmount: 50.00,
    paymentReference: 'PAY123456'
  },
  {
    id: '2',
    patientId: '2',
    sessionId: '2',
    billId: '2',
    transmissionDate: '2024-03-20T10:00:00',
    status: 'pending',
    amount: 60.00,
    type: 'mutuelle'
  }
];

export function useTeletransmission() {
  const [claims, setClaims] = useState<TeleClaim[]>(mockClaims);
  const [selectedClaim, setSelectedClaim] = useState<TeleClaim | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stats: TeleTransmissionStats = {
    pendingCount: claims.filter(c => c.status === 'pending').length,
    acceptedCount: claims.filter(c => c.status === 'accepted').length,
    rejectedCount: claims.filter(c => c.status === 'rejected').length,
    totalAmount: claims.reduce((sum, c) => sum + c.amount, 0),
    pendingAmount: claims.filter(c => c.status === 'pending')
      .reduce((sum, c) => sum + c.amount, 0),
    acceptedAmount: claims.filter(c => c.status === 'accepted')
      .reduce((sum, c) => sum + c.amount, 0)
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Processing file:', file.name);
      setIsLoading(false);
    } catch (err) {
      setError('Erreur lors du traitement du fichier');
      setIsLoading(false);
    }
  };

  const handleClaimSelection = (claim: TeleClaim) => {
    setSelectedClaim(claim);
  };

  const handlePaymentComplete = (claimId: string, transaction: PaymentTransaction) => {
    setClaims(prevClaims => prevClaims.map(claim => 
      claim.id === claimId
        ? {
            ...claim,
            status: 'accepted',
            paymentDate: transaction.timestamp,
            paymentAmount: transaction.amount,
            paymentReference: transaction.reference
          }
        : claim
    ));
  };

  return {
    claims,
    selectedClaim,
    stats,
    isLoading,
    error,
    handleFileUpload,
    handleClaimSelection,
    handlePaymentComplete
  };
}