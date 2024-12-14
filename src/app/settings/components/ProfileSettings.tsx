import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsForm } from './SettingsForm';

interface ProfileSettingsProps {
  settings: any;
  onUpdate: (section: string, values: any) => void;
}

export function ProfileSettings({ settings, onUpdate }: ProfileSettingsProps) {
  const fields = [
    {
      name: 'firstName',
      label: 'Prénom',
      type: 'text',
      value: settings.profile?.firstName || '',
    },
    {
      name: 'lastName',
      label: 'Nom',
      type: 'text',
      value: settings.profile?.lastName || '',
    },
    {
      name: 'professionalId',
      label: 'Numéro RPPS',
      type: 'text',
      value: settings.profile?.professionalId || '',
    },
    {
      name: 'specialization',
      label: 'Spécialisation',
      type: 'select',
      value: settings.profile?.specialization || '',
      options: [
        { value: 'general', label: 'Kinésithérapie générale' },
        { value: 'sport', label: 'Kinésithérapie du sport' },
        { value: 'respiratory', label: 'Kinésithérapie respiratoire' },
      ],
    },
  ];

  return (
    <SettingsSection title="Profil professionnel" description="Gérez vos informations professionnelles">
      <SettingsForm
        fields={fields}
        onSubmit={(values) => onUpdate('profile', values)}
      />
    </SettingsSection>
  );
}