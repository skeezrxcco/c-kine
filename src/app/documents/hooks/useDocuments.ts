import { useState } from 'react';
import { Document } from '@/features/medical-records/types';
import { useCrud } from '@/hooks/useCrud';

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Ordonnance_20240315.pdf',
    type: 'application/pdf',
    date: '2024-03-15',
    url: '/documents/ordonnance.pdf'
  },
  {
    id: '2',
    name: 'Radio_genou.jpg',
    type: 'image/jpeg',
    date: '2024-03-14',
    url: '/documents/radio.jpg'
  }
];

export function useDocuments() {
  const {
    items: documents,
    selectedItem: selectedDocument,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModals,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useCrud<Document>({
    initialItems: mockDocuments,
    onCreateSuccess: (doc) => {
      console.log('Document created:', doc);
    },
    onUpdateSuccess: (doc) => {
      console.log('Document updated:', doc);
    },
    onDeleteSuccess: (id) => {
      console.log('Document deleted:', id);
    },
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    patient: ''
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery);
    return matchesSearch;
  });

  return {
    documents: filteredDocuments,
    selectedDocument,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModals,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSearch,
    handleFilterChange
  };
}