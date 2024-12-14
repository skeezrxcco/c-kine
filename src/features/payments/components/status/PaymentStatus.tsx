import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { PaymentTransaction } from '../../types';
import { formatDateTime } from '@/utils/date';

interface PaymentStatusProps {
  transaction: PaymentTransaction;
}

export function PaymentStatus({ transaction }: PaymentStatusProps) {
  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'failed':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (transaction.status) {
      case 'completed':
        return 'Paiement effectué avec succès';
      case 'failed':
        return transaction.errorMessage || 'Le paiement a échoué';
      case 'processing':
        return 'Traitement en cours...';
      default:
        return 'En attente de paiement';
    }
  };

  return (
    <div className={`p-4 rounded-lg ${
      transaction.status === 'completed' ? 'bg-green-50' :
      transaction.status === 'failed' ? 'bg-red-50' :
      'bg-yellow-50'
    }`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div>
          <p className="font-medium">{getStatusMessage()}</p>
          <p className="text-sm text-gray-600">
            {formatDateTime(transaction.timestamp)}
          </p>
          {transaction.reference && (
            <p className="text-sm text-gray-600">
              Référence: {transaction.reference}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}