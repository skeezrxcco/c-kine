import { useState, useEffect } from 'react';
import { Task } from '../../../types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        // En production, remplacer par un vrai appel API
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Rédiger bilan final - Paul Durant',
            priority: 'high',
            status: 'todo',
            dueDate: '2024-03-21'
          },
          {
            id: '2',
            title: 'Mettre à jour dossier patient - Marie Martin',
            priority: 'medium',
            status: 'todo',
            dueDate: '2024-03-22'
          }
        ];
        setTasks(mockTasks);
      } catch (err) {
        setError('Erreur lors du chargement des tâches');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const updateTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
        : task
    ));
  };

  return {
    tasks,
    isLoading,
    error,
    updateTaskStatus
  };
}