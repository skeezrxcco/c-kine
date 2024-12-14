import React, { useState } from 'react';
import { PaymentProcessor } from '@/features/payments/components/PaymentProcessor';
import { PaymentTransaction } from '@/features/payments/types';
import { TeleClaim } from '@/types/teletransmission';
import { formatCurrency } from '@/utils/format';

interface PaymentSectionProps {
  selectedClaim: TeleClaim | null;
  onPaymentComplete: (claimId: string, transaction: PaymentTransaction) => void;
}

export function PaymentSection({ selectedClaim, onPaymentComplete }: PaymentSectionProps) {
  const [error, setError] = useState<string | null>(null);

  if (!selectedClaim) {
    return null;
  }

  const handlePaymentSuccess = (transaction: PaymentTransaction) => {
    onPaymentComplete(selectedClaim.id, transaction);
    setError(null);
  };

  const handlePaymentError = (error: Error) => {
    setError(error.message);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Paiement de la réclamation</h3>
        <div className="text-lg font-bold">
          {formatCurrency(selectedClaim.amount)}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <PaymentProcessor
        amount={selectedClaim.amount}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
}