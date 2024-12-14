import React from 'react';
import { Filter } from 'lucide-react';

interface DocumentFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function DocumentFilters({ onFilterChange }: DocumentFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filtres</h3>
        <Filter className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de document
          </label>
          <select 
            className="w-full border rounded-md p-2"
            onChange={(e) => onFilterChange({ type: e.target.value })}
          >
            <option value="all">Tous les types</option>
            <option value="prescription">Ordonnances</option>
            <option value="report">Comptes rendus</option>
            <option value="imaging">Imagerie</option>
            <option value="other">Autres</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <select 
            className="w-full border rounded-md p-2"
            onChange={(e) => onFilterChange({ dateRange: e.target.value })}
          >
            <option value="all">Toutes les dates</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Patient
          </label>
          <input
            type="text"
            placeholder="Nom du patient"
            className="w-full border rounded-md p-2"
            onChange={(e) => onFilterChange({ patient: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}