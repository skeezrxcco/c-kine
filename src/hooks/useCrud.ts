import { useState } from 'react';

interface CrudState<T> {
  items: T[];
  selectedItem: T | null;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
}

interface UseCrudOptions<T> {
  initialItems?: T[];
  onCreateSuccess?: (item: T) => void;
  onUpdateSuccess?: (item: T) => void;
  onDeleteSuccess?: (id: string) => void;
}

export function useCrud<T extends { id: string }>({
  initialItems = [],
  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
}: UseCrudOptions<T> = {}) {
  const [state, setState] = useState<CrudState<T>>({
    items: initialItems,
    selectedItem: null,
    isCreateModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
  });

  const openCreateModal = () => {
    setState(prev => ({ ...prev, isCreateModalOpen: true }));
  };

  const openEditModal = (item: T) => {
    setState(prev => ({
      ...prev,
      selectedItem: item,
      isEditModalOpen: true,
    }));
  };

  const openDeleteModal = (item: T) => {
    setState(prev => ({
      ...prev,
      selectedItem: item,
      isDeleteModalOpen: true,
    }));
  };

  const closeModals = () => {
    setState(prev => ({
      ...prev,
      selectedItem: null,
      isCreateModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
    }));
  };

  const handleCreate = (newItem: T) => {
    setState(prev => ({
      ...prev,
      items: [...prev.items, newItem],
      isCreateModalOpen: false,
    }));
    onCreateSuccess?.(newItem);
  };

  const handleUpdate = (updatedItem: T) => {
    setState(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      ),
      isEditModalOpen: false,
      selectedItem: null,
    }));
    onUpdateSuccess?.(updatedItem);
  };

  const handleDelete = () => {
    if (!state.selectedItem) return;

    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== prev.selectedItem?.id),
      isDeleteModalOpen: false,
      selectedItem: null,
    }));
    onDeleteSuccess?.(state.selectedItem.id);
  };

  return {
    items: state.items,
    selectedItem: state.selectedItem,
    isCreateModalOpen: state.isCreateModalOpen,
    isEditModalOpen: state.isEditModalOpen,
    isDeleteModalOpen: state.isDeleteModalOpen,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModals,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}