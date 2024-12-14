import React from 'react';
import { ArrowUpCircle, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { TeleTransmissionStats as Stats } from '@/types/teletransmission';
import { formatCurrency } from '@/utils/format';
import { StatCard } from './StatCard';

interface TeleTransmissionStatsProps {
  stats: Stats;
}

export function TeleTransmissionStats({ stats }: TeleTransmissionStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard
        title="En attente"
        value={stats.pendingCount}
        subValue={formatCurrency(stats.pendingAmount)}
        icon={<ArrowUpCircle />}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />

      <StatCard
        title="Acceptées"
        value={stats.acceptedCount}
        subValue={formatCurrency(stats.acceptedAmount)}
        icon={<CheckCircle />}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />

      <StatCard
        title="Rejetées"
        value={stats.rejectedCount}
        icon={<XCircle />}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
      />

      <StatCard
        title="Montant total"
        value={0}
        subValue={formatCurrency(stats.totalAmount)}
        icon={<DollarSign />}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
    </div>
  );
}