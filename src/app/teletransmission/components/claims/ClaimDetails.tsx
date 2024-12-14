import React from 'react';
import { TeleClaim } from '@/types/teletransmission';
import { formatDate, formatCurrency } from '@/utils/format';
import { ClaimStatusBadge } from './ClaimStatusBadge';
import { PaymentSection } from '../payment/PaymentSection';
import { PaymentTransaction } from '@/features/payments/types';
import { FileText, User, Calendar, CreditCard } from 'lucide-react';

interface ClaimDetailsProps {
  claim: TeleClaim;
  onPaymentComplete: (claimId: string, transaction: PaymentTransaction) => void;
}

export function ClaimDetails({ claim, onPaymentComplete }: ClaimDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium">Détails de la réclamation</h3>
        <ClaimStatusBadge status={claim.status} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Date de transmission</p>
              <p className="font-medium">{formatDate(claim.transmissionDate)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Patient</p>
              <p className="font-medium">Patient #{claim.patientId}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium capitalize">{claim.type}</p>
            </div>
          </div>

          {claim.paymentReference && (
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Référence paiement</p>
                <p className="font-medium">{claim.paymentReference}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          {claim.status === 'pending' && (
            <PaymentSection
              selectedClaim={claim}
              onPaymentComplete={onPaymentComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}