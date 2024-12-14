'use client';

import { useState, useEffect } from 'react';
import { Appointment } from '@/types';
import { 
  getAppointments, 
  createAppointment, 
  updateAppointment, 
  deleteAppointment 
} from '../actions';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const result = await getAppointments(selectedDate);
      if (result.error) {
        setError(result.error);
      } else {
        setAppointments(result.data || []);
      }
    } catch (err) {
      setError('Erreur lors du chargement des rendez-vous');
      console.error('Error fetching appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const handleCreate = async (data: Partial<Appointment>) => {
    try {
      setIsLoading(true);
      const result = await createAppointment(data);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchAppointments();
        setIsCreateModalOpen(false);
      }
    } catch (err) {
      setError('Erreur lors de la création du rendez-vous');
      console.error('Error creating appointment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Appointment>) => {
    try {
      setIsLoading(true);
      const result = await updateAppointment(id, data);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchAppointments();
        setIsEditModalOpen(false);
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour du rendez-vous');
      console.error('Error updating appointment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const result = await deleteAppointment(id);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchAppointments();
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      setError('Erreur lors de la suppression du rendez-vous');
      console.error('Error deleting appointment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setSelectedAppointment(null);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedAppointment(null);
  };

  return {
    appointments,
    selectedDate,
    setSelectedDate,
    selectedAppointment,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isLoading,
    error,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModals,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}