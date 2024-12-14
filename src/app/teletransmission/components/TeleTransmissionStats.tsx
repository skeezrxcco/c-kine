import React from 'react';
import { ArrowUpCircle, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { TeleTransmissionStats as TeleTransmissionStatsType } from '@/types/teletransmission';
import { formatCurrency } from '@/utils/format';

interface TeleTransmissionStatsProps {
  stats: TeleTransmissionStatsType;
}

export function TeleTransmissionStats({ stats }: TeleTransmissionStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">En attente</p>
            <p className="text-2xl font-bold mt-1">{stats.pendingCount}</p>
          </div>
          <div className="p-2 bg-yellow-100 rounded-lg">
            <ArrowUpCircle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {formatCurrency(stats.pendingAmount)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">Acceptées</p>
            <p className="text-2xl font-bold mt-1">{stats.acceptedCount}</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {formatCurrency(stats.acceptedAmount)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">Rejetées</p>
            <p className="text-2xl font-bold mt-1">{stats.rejectedCount}</p>
          </div>
          <div className="p-2 bg-red-100 rounded-lg">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">Montant total</p>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(stats.totalAmount)}
            </p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
