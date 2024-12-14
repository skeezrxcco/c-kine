import React from 'react';
import { SettingsTabs } from './components/SettingsTabs';
import { GeneralSettings } from './components/GeneralSettings';
import { ProfileSettings } from './components/ProfileSettings';
import { SecuritySettings } from './components/SecuritySettings';
import { NotificationSettings } from './components/NotificationSettings';
import { useSettings } from './hooks/useSettings';

export function Settings() {
  const { activeTab, setActiveTab, settings, updateSettings } = useSettings();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings settings={settings} onUpdate={updateSettings} />;
      case 'profile':
        return <ProfileSettings settings={settings} onUpdate={updateSettings} />;
      case 'security':
        return <SecuritySettings settings={settings} onUpdate={updateSettings} />;
      case 'notifications':
        return <NotificationSettings settings={settings} onUpdate={updateSettings} />;
      default:
        return <GeneralSettings settings={settings} onUpdate={updateSettings} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Paramètres</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
}