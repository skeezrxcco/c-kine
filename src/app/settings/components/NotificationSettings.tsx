import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsForm } from './SettingsForm';

interface NotificationSettingsProps {
  settings: any;
  onUpdate: (section: string, values: any) => void;
}

export function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
  const fields = [
    {
      name: 'emailNotifications',
      label: 'Notifications par email',
      type: 'switch',
      value: settings.notifications?.emailNotifications || false,
    },
    {
      name: 'smsNotifications',
      label: 'Notifications par SMS',
      type: 'switch',
      value: settings.notifications?.smsNotifications || false,
    },
    {
      name: 'appointmentReminders',
      label: 'Rappels de rendez-vous',
      type: 'switch',
      value: settings.notifications?.appointmentReminders || false,
    },
    {
      name: 'reminderTime',
      label: 'Délai de rappel',
      type: 'select',
      value: settings.notifications?.reminderTime || '24h',
      options: [
        { value: '12h', label: '12 heures avant' },
        { value: '24h', label: '24 heures avant' },
        { value: '48h', label: '48 heures avant' },
      ],
    },
  ];

  return (
    <SettingsSection title="Notifications" description="Gérez vos préférences de notifications">
      <SettingsForm
        fields={fields}
        onSubmit={(values) => onUpdate('notifications', values)}
      />
    </SettingsSection>
  );
}