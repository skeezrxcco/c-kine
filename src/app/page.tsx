'use client';

import React from 'react';
import { Users, Calendar, Activity, CreditCard } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { AppointmentList } from '../components/appointments/AppointmentList';
import { TaskList } from '../components/tasks/TaskList';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Patients du jour"
          value={12}
          icon={<Users className="w-6 h-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Rendez-vous"
          value={45}
          icon={<Calendar className="w-6 h-6" />}
        />
        <StatCard
          title="Taux de présence"
          value="95%"
          icon={<Activity className="w-6 h-6" />}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Chiffre du mois"
          value="4,250 €"
          icon={<CreditCard className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <AppointmentList />
        <TaskList />
      </div>
    </div>
  );
}