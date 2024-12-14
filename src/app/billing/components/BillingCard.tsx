import React from 'react';
import { CreditCard, Download, Send } from 'lucide-react';
import { Bill } from '../types';
import { formatDate, formatCurrency } from '@/utils/format';

interface BillingCardProps {
  bill: Bill;
}

export function BillingCard({ bill }: BillingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'pending':
        return 'En attente';
      case 'rejected':
        return 'Rejetée';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">Facture #{bill.id}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(bill.status)}`}>
              {getStatusText(bill.status)}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Émise le {formatDate(bill.date)}
          </p>
        </div>
        <div className="text-xl font-bold">
          {formatCurrency(bill.amount)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Patient</p>
          <p className="font-medium">Patient #{bill.patientId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Séance</p>
          <p className="font-medium">Séance #{bill.sessionId}</p>
        </div>
        {bill.paymentMethod && (
          <div>
            <p className="text-sm text-gray-500">Moyen de paiement</p>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span>{bill.paymentMethod}</span>
            </div>
          </div>
        )}
        {bill.insuranceDetails && (
          <div>
            <p className="text-sm text-gray-500">Assurance</p>
            <p className="font-medium">{bill.insuranceDetails}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <Download className="w-4 h-4" />
          <span>Télécharger</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Send className="w-4 h-4" />
          <span>Envoyer</span>
        </button>
      </div>
    </div>
  );
}