import React from 'react';
import { BillingList } from '@/app/billing/components/BillingList';
import { BillingFilters } from './components/BillingFilters';
import { BillingSearch } from './components/BillingSearch';
import { BillingStats } from './components/BillingStats';
import { useBilling } from '@/app/billing/hooks/useBilling';

export function Billing() {
  const { bills, isLoading, error } = useBilling();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Facturation</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Nouvelle facture
        </button>
      </div>

      <BillingStats />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <BillingFilters />
        </div>
        
        <div className="col-span-9">
          <BillingSearch />
          {isLoading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : error ? (
            <div className="text-red-600 py-8">{error}</div>
          ) : (
            <BillingList bills={bills} />
          )}
        </div>
      </div>
    </div>
  );
}