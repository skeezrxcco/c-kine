import React from 'react';
import { Bell } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  title: string;
}

export function Header({ user, title }: HeaderProps) {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 ml-64">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center space-x-3">
          <img
            src={user.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">Dr. {user.firstName} {user.lastName}</span>
        </div>
      </div>
    </header>
  );
}