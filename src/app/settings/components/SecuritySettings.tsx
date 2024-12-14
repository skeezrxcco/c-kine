import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsForm } from './SettingsForm';

interface SecuritySettingsProps {
  settings: any;
  onUpdate: (section: string, values: any) => void;
}

export function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
  const fields = [
    {
      name: 'currentPassword',
      label: 'Mot de passe actuel',
      type: 'password',
      value: '',
    },
    {
      name: 'newPassword',
      label: 'Nouveau mot de passe',
      type: 'password',
      value: '',
    },
    {
      name: 'confirmPassword',
      label: 'Confirmer le mot de passe',
      type: 'password',
      value: '',
    },
    {
      name: 'twoFactorEnabled',
      label: 'Authentification à deux facteurs',
      type: 'switch',
      value: settings.security?.twoFactorEnabled || false,
    },
  ];

  return (
    <SettingsSection title="Sécurité" description="Gérez vos paramètres de sécurité et de connexion">
      <SettingsForm
        fields={fields}
        onSubmit={(values) => onUpdate('security', values)}
      />
    </SettingsSection>
  );
}