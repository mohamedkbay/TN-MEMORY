import React from 'react';
import { EquipmentStatus, OrderStatus } from '../../types';

interface StatusBadgeProps {
  status: EquipmentStatus | OrderStatus | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorClass = 'bg-gray-100 text-gray-800';

  switch (status) {
    case EquipmentStatus.AVAILABLE:
      colorClass = 'bg-teal-100 text-teal-800 border border-teal-200'; // Teal for Available
      break;
    case EquipmentStatus.CHECKED_OUT:
    case OrderStatus.ACTIVE:
      colorClass = 'bg-orange-100 text-orange-800 border border-orange-200'; // Orange for Active/Checked Out
      break;
    case EquipmentStatus.MAINTENANCE:
      colorClass = 'bg-red-100 text-red-800 border border-red-200';
      break;
    case EquipmentStatus.DAMAGED:
    case EquipmentStatus.LOST:
      colorClass = 'bg-red-100 text-red-800 border border-red-200';
      break;
    case OrderStatus.COMPLETED:
      colorClass = 'bg-gray-100 text-gray-600 border border-gray-200';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};