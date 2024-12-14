'use client';

import React from 'react';
import { Task } from '../../types';
import { Calendar, Flag } from 'lucide-react';
import { formatDate } from '../../utils/date';

interface TaskItemProps {
  task: Task;
  onStatusChange: () => void;
}

export function TaskItem({ task, onStatusChange }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Urgent';
      case 'medium':
        return 'Normal';
      case 'low':
        return 'Faible';
      default:
        return priority;
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 border-b hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        className="rounded text-indigo-600"
        checked={task.status === 'done'}
        onChange={onStatusChange}
      />
      <div className="flex-1">
        <p className={`font-medium ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </p>
        {task.dueDate && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
      <span className={`px-2 py-1 rounded-full text-xs flex items-center ${getPriorityColor(task.priority)}`}>
        <Flag className="w-3 h-3 mr-1" />
        {getPriorityText(task.priority)}
      </span>
    </div>
  );
}