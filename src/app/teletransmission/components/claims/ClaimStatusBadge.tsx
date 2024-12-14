import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface ClaimStatusBadgeProps {
  status: string;
}

export function ClaimStatusBadge({ status }: ClaimStatusBadgeProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Acceptée';
      case 'rejected':
        return 'Rejetée';
      case 'sent':
        return 'Envoyée';
      default:
        return 'En attente';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {getStatusIcon(status)}
      <span>{getStatusText(status)}</span>
    </div>
  );
}