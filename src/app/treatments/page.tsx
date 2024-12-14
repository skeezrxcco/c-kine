import React from 'react';
import { TreatmentList } from './components/TreatmentList';
import { TreatmentFilters } from './components/TreatmentFilters';
import { TreatmentForm } from './components/TreatmentForm';
import { SlideOver } from '@/components/ui/SlideOver';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useTreatments } from './hooks/useTreatments';
import { Treatment } from '@/types';

export function Treatments() {
  const {
    treatments,
    selectedTreatment,
    isLoading,
    error,
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
  } = useTreatments();

  const handleTreatmentAction = (action: 'edit' | 'delete', treatment: Treatment) => {
    if (action === 'edit') {
      openEditModal(treatment);
    } else {
      openDeleteModal(treatment);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Traitements</h1>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Nouveau traitement
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <TreatmentFilters onFilter={() => {}} />
        </div>
        
        <div className="col-span-9">
          {isLoading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : error ? (
            <div className="text-red-600 py-8">{error}</div>
          ) : (
            <TreatmentList
              treatments={treatments}
              onTreatmentAction={handleTreatmentAction}
            />
          )}
        </div>
      </div>

      {/* Create/Edit SlideOver */}
      <SlideOver
        title={selectedTreatment ? 'Modifier le traitement' : 'Nouveau traitement'}
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={closeModals}
      >
        <TreatmentForm
          initialData={selectedTreatment}
          onSubmit={selectedTreatment ? handleUpdate : handleCreate}
          onCancel={closeModals}
        />
      </SlideOver>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDelete}
        title="Supprimer le traitement"
        message="Êtes-vous sûr de vouloir supprimer ce traitement ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </div>
  );
}