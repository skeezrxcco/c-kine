'use client';

import React, { useState } from 'react';
import { Task } from '../../types';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

  const handleTaskStatusChange = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
        : task
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Tâches à faire</h3>
        <span className="text-sm text-gray-500">
          {tasks.filter(t => t.status === 'todo').length} tâches en attente
        </span>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onStatusChange={() => handleTaskStatusChange(task.id)}
          />
        ))}
      </div>
    </div>
  );
}