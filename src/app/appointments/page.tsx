'use client';

import React from 'react';
import { Calendar } from './components/Calendar';
import { AppointmentDetails } from './components/AppointmentDetails';
import { AppointmentForm } from './components/AppointmentForm';
import { Dialog } from '@/components/ui/Dialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useAppointments } from './hooks/useAppointments';
import { Appointment } from '@/types';

export default function AppointmentsPage() {
  const {
    appointments,
    selectedDate,
    setSelectedDate,
    selectedAppointment,
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
  } = useAppointments();

  const handleAppointmentAction = (action: 'edit' | 'delete', appointment: Appointment) => {
    if (action === 'edit') {
      openEditModal(appointment);
    } else {
      openDeleteModal(appointment);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rendez-vous</h1>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Nouveau rendez-vous
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <Calendar 
            appointments={appointments}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onSelectAppointment={(appointment) => openEditModal(appointment)}
          />
        </div>
        <div className="col-span-4">
          {selectedAppointment ? (
            <AppointmentDetails 
              appointment={selectedAppointment}
              onEdit={() => openEditModal(selectedAppointment)}
              onDelete={() => openDeleteModal(selectedAppointment)}
            />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-500 text-center">
                Sélectionnez un rendez-vous pour voir les détails
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={closeModals}
        title={selectedAppointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
      >
        <AppointmentForm
          initialData={selectedAppointment}
          selectedDate={selectedDate}
          onSubmit={selectedAppointment ? handleUpdate : handleCreate}
          onCancel={closeModals}
        />
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDelete}
        title="Supprimer le rendez-vous"
        message="Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </div>
  );
}