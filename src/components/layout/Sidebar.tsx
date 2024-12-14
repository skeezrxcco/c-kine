import React from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  ClipboardList, 
  CreditCard, 
  FolderOpen,
  Send
} from 'lucide-react';
import { SidebarLink } from './SidebarLink';

export function Sidebar() {
  return (
    <div className="w-64 bg-indigo-800 text-white h-screen fixed left-0 top-0 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">KinéSoft</h1>
      </div>
      <nav className="space-y-1">
        <SidebarLink icon={<Calendar />} text="Rendez-vous" path="/appointments" />
        <SidebarLink icon={<Users />} text="Patients" path="/patients" />
        <SidebarLink icon={<ClipboardList />} text="Traitements" path="/treatments" />
        <SidebarLink icon={<FolderOpen />} text="Dossiers" path="/dossiers" />
        <SidebarLink icon={<FileText />} text="Documents" path="/documents" />
        <SidebarLink icon={<CreditCard />} text="Facturation" path="/billing" />
        <SidebarLink icon={<Send />} text="Télétransmission" path="/teletransmission" />
        <SidebarLink icon={<Settings />} text="Paramètres" path="/settings" />
      </nav>
    </div>
  );
}