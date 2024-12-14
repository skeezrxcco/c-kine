'use client';

import { useState, useEffect } from 'react';
import { Treatment } from '@/types';
import { 
  getTreatments, 
  createTreatment, 
  updateTreatment, 
  deleteTreatment,
  addExerciseToTreatment,
  addObjectiveToTreatment
} from '../actions';

export function useTreatments(patientId?: string) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTreatments = async () => {
    try {
      setIsLoading(true);
      const result = await getTreatments(patientId);
      if (result.error) {
        setError(result.error);
      } else {
        setTreatments(result.data || []);
      }
    } catch (err) {
      setError('Erreur lors du chargement des traitements');
      console.error('Error fetching treatments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, [patientId]);

  const handleCreate = async (data: Partial<Treatment>) => {
    try {
      setIsLoading(true);
      const result = await createTreatment(data);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchTreatments();
        setIsCreateModalOpen(false);
      }
    } catch (err) {
      setError('Erreur lors de la création du traitement');
      console.error('Error creating treatment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Treatment>) => {
    try {
      setIsLoading(true);
      const result = await updateTreatment(id, data);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchTreatments();
        setIsEditModalOpen(false);
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour du traitement');
      console.error('Error updating treatment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const result = await deleteTreatment(id);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchTreatments();
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      setError('Erreur lors de la suppression du traitement');
      console.error('Error deleting treatment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExercise = async (treatmentId: string, exerciseData: any) => {
    try {
      setIsLoading(true);
      const result = await addExerciseToTreatment(treatmentId, exerciseData);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchTreatments();
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'exercice');
      console.error('Error adding exercise:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddObjective = async (treatmentId: string, objectiveData: any) => {
    try {
      setIsLoading(true);
      const result = await addObjectiveToTreatment(treatmentId, objectiveData);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchTreatments();
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'objectif');
      console.error('Error adding objective:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setSelectedTreatment(null);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTreatment(null);
  };

  return {
    treatments,
    selectedTreatment,
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
    handleAddExercise,
    handleAddObjective
  };
}