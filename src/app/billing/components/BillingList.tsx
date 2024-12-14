import React from 'react';
import { BillingCard } from './BillingCard';
import { useBilling } from '../hooks/useBilling';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export function BillingList() {
  const { bills, isLoading, error } = useBilling();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-4">
      {bills.map((bill) => (
        <BillingCard key={bill.id} bill={bill} />
      ))}
    </div>
  );
}