import React from 'react';
import { DocumentList } from './components/DocumentList';
import { DocumentFilters } from './components/DocumentFilters';
import { DocumentSearch } from './components/DocumentSearch';
import { DocumentForm } from './components/DocumentForm';
import { useDocuments } from './hooks/useDocuments';
import { Dialog } from '@/components/ui/Dialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Document } from '@/features/medical-records/types';

export function Documents() {
  const {
    documents,
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
  } = useDocuments();

  const handleDocumentAction = (action: 'edit' | 'delete', document: Document) => {
    if (action === 'edit') {
      openEditModal(document);
    } else {
      openDeleteModal(document);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documents</h1>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Nouveau document
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <DocumentFilters onFilterChange={handleFilterChange} />
        </div>
        
        <div className="col-span-9">
          <DocumentSearch onSearch={handleSearch} />
          <DocumentList
            documents={documents}
            onDocumentAction={handleDocumentAction}
          />
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={closeModals}
        title={selectedDocument ? 'Modifier le document' : 'Nouveau document'}
      >
        <DocumentForm
          initialData={selectedDocument}
          onSubmit={selectedDocument ? handleUpdate : handleCreate}
          onCancel={closeModals}
        />
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDelete}
        title="Supprimer le document"
        message="Êtes-vous sûr de vouloir supprimer ce document ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </div>
  );
}