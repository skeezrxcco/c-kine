import React from 'react';
import { DossierFilters } from './components/DossierFilters';
import { DossierSearch } from './components/DossierSearch';
import { MedicalRecordList } from '@/features/medical-records/components/MedicalRecordList';
import { DossierForm } from './components/DossierForm';
import { useDossiers } from './hooks/useDossiers';
import { Dialog } from '@/components/ui/Dialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { MedicalRecord } from '@/features/medical-records/types';

export function Dossiers() {
  const {
    records,
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
  } = useDossiers();

  const handleDossierAction = (action: 'edit' | 'delete', record: MedicalRecord) => {
    if (action === 'edit') {
      openEditModal(record);
    } else {
      openDeleteModal(record);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dossiers Médicaux</h1>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Nouveau dossier
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <DossierFilters onFilterChange={handleFilterChange} />
        </div>
        
        <div className="col-span-9">
          <DossierSearch onSearch={handleSearch} />
          <MedicalRecordList
            records={records}
            onRecordAction={handleDossierAction}
          />
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={closeModals}
        title={selectedRecord ? 'Modifier le dossier' : 'Nouveau dossier'}
      >
        <DossierForm
          initialData={selectedRecord}
          onSubmit={selectedRecord ? handleUpdate : handleCreate}
          onCancel={closeModals}
        />
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDelete}
        title="Supprimer le dossier"
        message="Êtes-vous sûr de vouloir supprimer ce dossier ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </div>
  );
}