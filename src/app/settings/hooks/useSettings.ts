import { useState } from 'react';

const defaultSettings = {
  general: {
    practiceName: 'Cabinet de Kinésithérapie',
    address: '123 rue de la Santé\n75000 Paris',
    phone: '01 23 45 67 89',
    email: 'contact@cabinet-kine.fr',
    timezone: 'Europe/Paris',
  },
  profile: {
    firstName: 'Sophie',
    lastName: 'Martin',
    professionalId: '12345678',
    specialization: 'general',
  },
  security: {
    twoFactorEnabled: false,
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    reminderTime: '24h',
  },
};

export function useSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(defaultSettings);

  const updateSettings = (section: string, values: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...values,
      },
    }));
  };

  return {
    activeTab,
    setActiveTab,
    settings,
    updateSettings,
  };
}