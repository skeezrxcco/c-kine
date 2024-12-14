import React from 'react';
import { Euro, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export function BillingStats() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">Chiffre du mois</p>
            <p className="text-2xl font-bold mt-1">4,250 €</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <Euro className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-sm text-green-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+12% vs mois dernier</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">En attente</p>
            <p className="text-2xl font-bold mt-1">850 €</p>
          </div>
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">5 factures en attente</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">Payées</p>
            <p className="text-2xl font-bold mt-1">3,400 €</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">28 factures payées</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">Taux de recouvrement</p>
            <p className="text-2xl font-bold mt-1">95%</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-sm text-blue-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+2% vs mois dernier</span>
        </div>
      </div>
    </div>
  );
}