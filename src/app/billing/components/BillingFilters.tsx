import React from 'react';
import { Filter } from 'lucide-react';

export function BillingFilters() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filtres</h3>
        <Filter className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select className="w-full border rounded-md p-2">
            <option value="all">Tous les statuts</option>
            <option value="paid">Payées</option>
            <option value="pending">En attente</option>
            <option value="overdue">En retard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Période
          </label>
          <select className="w-full border rounded-md p-2">
            <option value="all">Toutes les périodes</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Montant
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="border rounded-md p-2"
            />
            <input
              type="number"
              placeholder="Max"
              className="border rounded-md p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mode de paiement
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Carte bancaire</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Espèces</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Chèque</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}