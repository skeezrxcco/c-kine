import React from 'react';
import { Search } from 'lucide-react';

interface DocumentSearchProps {
  onSearch: (query: string) => void;
}

export function DocumentSearch({ onSearch }: DocumentSearchProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un document..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}