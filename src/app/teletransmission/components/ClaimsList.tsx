import React from 'react';
import { TeleClaim } from '@/types/teletransmission';
import { formatDate, formatCurrency } from '@/utils/format';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface ClaimsListProps {
  claims: TeleClaim[];
  onClaimSelect: (claim: TeleClaim) => void;
}

export function ClaimsList({ claims, onClaimSelect }: ClaimsListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Acceptée';
      case 'rejected':
        return 'Rejetée';
      case 'sent':
        return 'Envoyée';
      default:
        return 'En attente';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-6 p-4 font-medium text-gray-700 border-b">
        <div>Date</div>
        <div>Type</div>
        <div>Montant</div>
        <div>Statut</div>
        <div>Référence</div>
        <div>Date paiement</div>
      </div>
      <div className="divide-y">
        {claims.map((claim) => (
          <div
            key={claim.id}
            onClick={() => onClaimSelect(claim)}
            className="grid grid-cols-6 p-4 items-center hover:bg-gray-50 cursor-pointer"
          >
            <div>{formatDate(claim.transmissionDate)}</div>
            <div className="capitalize">{claim.type}</div>
            <div>{formatCurrency(claim.amount)}</div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(claim.status)}
              <span>{getStatusText(claim.status)}</span>
            </div>
            <div>{claim.paymentReference || '-'}</div>
            <div>{claim.paymentDate ? formatDate(claim.paymentDate) : '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}