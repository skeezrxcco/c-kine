import React from 'react';
import { Filter } from 'lucide-react';

interface DossierFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function DossierFilters({ onFilterChange }: DossierFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filtres</h3>
        <Filter className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            État du dossier
          </label>
          <select 
            className="w-full border rounded-md p-2"
            onChange={(e) => onFilterChange({ status: e.target.value })}
          >
            <option value="all">Tous les dossiers</option>
            <option value="active">En cours</option>
            <option value="archived">Archivés</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de pathologie
          </label>
          <div className="space-y-2">
            {['Traumatologie', 'Rhumatologie', 'Rééducation'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600"
                  onChange={(e) => onFilterChange({ pathologyType: type, checked: e.target.checked })}
                />
                <span className="ml-2 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de création
          </label>
          <select 
            className="w-full border rounded-md p-2"
            onChange={(e) => onFilterChange({ dateRange: e.target.value })}
          >
            <option value="all">Toutes les dates</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
        </div>
      </div>
    </div>
  );
}