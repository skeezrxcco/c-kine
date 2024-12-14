import React from 'react';
import { File, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { Document } from '@/features/medical-records/types';
import { formatDate } from '@/utils/date';

interface DocumentListProps {
  documents: Document[];
  onDocumentAction: (action: 'edit' | 'delete', document: Document) => void;
}

export function DocumentList({ documents, onDocumentAction }: DocumentListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-4 p-4 font-medium text-gray-700 border-b">
        <div>Nom</div>
        <div>Type</div>
        <div>Date</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="divide-y">
        {documents.map((doc) => (
          <div key={doc.id} className="grid grid-cols-4 p-4 items-center hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <File className="w-5 h-5 text-gray-400" />
              <span className="font-medium">{doc.name}</span>
            </div>
            <div className="text-gray-600">{doc.type}</div>
            <div className="text-gray-600">{formatDate(doc.date)}</div>
            <div className="flex justify-end space-x-2">
              <button className="p-1 text-gray-400 hover:text-indigo-600">
                <Eye className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-400 hover:text-indigo-600">
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDocumentAction('edit', doc)}
                className="p-1 text-gray-400 hover:text-indigo-600"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDocumentAction('delete', doc)}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}