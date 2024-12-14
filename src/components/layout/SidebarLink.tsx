'use client';
import Link from 'next/link';
import { usePathname, } from 'next/navigation';
import React from 'react';


interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  path: string;
}

export function SidebarLink({ icon, text, path }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link href={path}>
      <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors
        ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  );
}