'use client';

import { useState, useEffect } from 'react';
import { Patient } from '@/types';
import { 
  getPatients, 
  createPatient, 
  updatePatient, 
  deletePatient 
} from '../actions';

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const result = await getPatients(searchQuery);
      if (result.error) {
        setError(result.error);
      } else {
        setPatients(result.data || []);
      }
    } catch (err) {
      setError('Erreur lors du chargement des patients');
      console.error('Error fetching patients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [searchQuery]);

  const handleCreate = async (data: Partial<Patient>) => {
    try {
      setIsLoading(true);
      const result = await createPatient(data);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchPatients();
        setIsCreateModalOpen(false);
      }
    } catch (err) {
      setError('Erreur lors de la création du patient');
      console.error('Error creating patient:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Patient>) => {
    try {
      setIsLoading(true);
      const result = await updatePatient(id, data);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchPatients();
        setIsEditModalOpen(false);
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour du patient');
      console.error('Error updating patient:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const result = await deletePatient(id);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchPatients();
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      setError('Erreur lors de la suppression du patient');
      console.error('Error deleting patient:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setSelectedPatient(null);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedPatient(null);
  };

  const searchPatients = (query: string) => {
    setSearchQuery(query);
  };

  return {
    patients,
    selectedPatient,
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
    searchPatients
  };
}