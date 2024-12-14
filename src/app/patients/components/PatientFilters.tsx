'use client';

import React from 'react';

interface PatientFiltersProps {
  onFilter: (filters: any) => void;
}

export function PatientFilters({ onFilter }: PatientFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-4">Filtres</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tranche d'âge
          </label>
          <select className="w-full border rounded-md p-2">
            <option value="">Tous les âges</option>
            <option value="0-18">0-18 ans</option>
            <option value="19-30">19-30 ans</option>
            <option value="31-50">31-50 ans</option>
            <option value="51+">51 ans et plus</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de traitement
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Rééducation</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Traumatologie</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Neurologie</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">En cours de traitement</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Traitement terminé</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}