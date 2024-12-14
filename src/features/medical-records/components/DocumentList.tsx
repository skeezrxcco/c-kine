import React from 'react';
import { File, Download, Eye } from 'lucide-react';
import { Document } from '../types';
import { formatDate } from '@/utils/date';

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <div>
      <h4 className="font-medium mb-2">Documents</h4>
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
            <div className="flex items-center space-x-3">
              <File className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-gray-500">{formatDate(doc.date)}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 text-gray-400 hover:text-indigo-600">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-indigo-600">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}