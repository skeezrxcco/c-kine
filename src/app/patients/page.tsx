'use client';

import React from 'react';
import { PatientList } from './components/PatientList';
import { PatientSearch } from './components/PatientSearch';
import { PatientFilters } from './components/PatientFilters';
import { PatientForm } from './components/PatientForm';
import { usePatients } from './hooks/usePatients';
import { SlideOver } from '@/components/ui/SlideOver';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Patient } from '@/types';

export function Patients() {
  const {
    patients,
    isLoading,
    error,
    searchPatients,
    filterPatients,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedPatient,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModals,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = usePatients();

  const handlePatientAction = (action: 'edit' | 'delete', patient: Patient) => {
    if (action === 'edit') {
      openEditModal(patient);
    } else {
      openDeleteModal(patient);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients</h1>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Nouveau patient
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <PatientFilters onFilter={filterPatients} />
        </div>
        
        <div className="col-span-9">
          <PatientSearch onSearch={searchPatients} />
          {isLoading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div>Erreur: {error}</div>
          ) : (
            <PatientList
              patients={patients}
              onPatientAction={handlePatientAction}
            />
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <SlideOver
        title={selectedPatient ? 'Modifier le patient' : 'Nouveau patient'}
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={closeModals}
      >
        <PatientForm
          initialData={selectedPatient || undefined}
          onSubmit={selectedPatient ? handleUpdate : handleCreate}
          onCancel={closeModals}
        />
      </SlideOver>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDelete}
        title="Supprimer le patient"
        message="Êtes-vous sûr de vouloir supprimer ce patient ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </div>
  );
}