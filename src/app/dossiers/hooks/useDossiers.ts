import { useState } from 'react';
import { MedicalRecord } from '@/features/medical-records/types';
import { useCrud } from '@/hooks/useCrud';
import { mockMedicalRecords } from '@/features/medical-records/mocks/medicalRecords';

export function useDossiers() {
  const {
    items: records,
    selectedItem: selectedRecord,
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
  } = useCrud<MedicalRecord>({
    initialItems: mockMedicalRecords,
    onCreateSuccess: (record) => {
      console.log('Medical record created:', record);
    },
    onUpdateSuccess: (record) => {
      console.log('Medical record updated:', record);
    },
    onDeleteSuccess: (id) => {
      console.log('Medical record deleted:', id);
    },
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    pathologyTypes: new Set(),
    dateRange: 'all'
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilterChange = (newFilter: any) => {
    if (newFilter.pathologyType) {
      const newPathologyTypes = new Set(filters.pathologyTypes);
      if (newFilter.checked) {
        newPathologyTypes.add(newFilter.pathologyType);
      } else {
        newPathologyTypes.delete(newFilter.pathologyType);
      }
      setFilters({ ...filters, pathologyTypes: newPathologyTypes });
    } else {
      setFilters({ ...filters, ...newFilter });
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = searchQuery === '' || 
      `${record.patient.firstName} ${record.patient.lastName}`
        .toLowerCase()
        .includes(searchQuery);

    return matchesSearch;
  });

  return {
    records: filteredRecords,
    selectedRecord,
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