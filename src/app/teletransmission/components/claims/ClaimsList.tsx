import React from 'react';
import { TeleClaim } from '@/types/teletransmission';
import { formatDate, formatCurrency } from '@/utils/format';
import { ClaimStatusBadge } from './ClaimStatusBadge';

interface ClaimsListProps {
  claims: TeleClaim[];
  onClaimSelect: (claim: TeleClaim) => void;
}

export function ClaimsList({ claims, onClaimSelect }: ClaimsListProps) {
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
            <ClaimStatusBadge status={claim.status} />
            <div>{claim.paymentReference || '-'}</div>
            <div>{claim.paymentDate ? formatDate(claim.paymentDate) : '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}