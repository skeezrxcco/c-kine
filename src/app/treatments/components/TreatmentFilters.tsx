import React from 'react';

interface TreatmentFiltersProps {
  onFilter: (filters: any) => void;
}

export function TreatmentFilters({ onFilter }: TreatmentFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-4">Filtres</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            État
          </label>
          <select className="w-full border rounded-md p-2">
            <option value="">Tous les états</option>
            <option value="active">En cours</option>
            <option value="completed">Terminé</option>
            <option value="pending">En attente</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de pathologie
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Traumatologie</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Rhumatologie</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Neurologie</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">Rééducation post-op</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Progression
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">0-25%</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">26-50%</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">51-75%</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="ml-2 text-sm">76-100%</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}