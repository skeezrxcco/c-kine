import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsForm } from './SettingsForm';

interface GeneralSettingsProps {
  settings: any;
  onUpdate: (section: string, values: any) => void;
}

export function GeneralSettings({ settings, onUpdate }: GeneralSettingsProps) {
  const fields = [
    {
      name: 'practiceName',
      label: 'Nom du cabinet',
      type: 'text',
      value: settings.general?.practiceName || '',
    },
    {
      name: 'address',
      label: 'Adresse',
      type: 'textarea',
      value: settings.general?.address || '',
    },
    {
      name: 'phone',
      label: 'Téléphone',
      type: 'tel',
      value: settings.general?.phone || '',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: settings.general?.email || '',
    },
    {
      name: 'timezone',
      label: 'Fuseau horaire',
      type: 'select',
      value: settings.general?.timezone || 'Europe/Paris',
      options: [
        { value: 'Europe/Paris', label: 'Paris (UTC+1)' },
        { value: 'Europe/London', label: 'Londres (UTC)' },
      ],
    },
  ];

  return (
    <SettingsSection title="Paramètres généraux" description="Configurez les informations de base de votre cabinet">
      <SettingsForm
        fields={fields}
        onSubmit={(values) => onUpdate('general', values)}
      />
    </SettingsSection>
  );
}