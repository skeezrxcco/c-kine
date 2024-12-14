import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  subValue?: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

export function StatCard({ title, value, subValue, icon, iconBgColor, iconColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          {React.cloneElement(icon as React.ReactElement, {
            className: `w-6 h-6 ${iconColor}`
          })}
        </div>
      </div>
      {subValue && (
        <p className="mt-2 text-sm text-gray-600">{subValue}</p>
      )}
    </div>
  );
}