
import React from 'react';
import { useApp } from '../context/AppContext';
import { EquipmentStatus, OrderStatus } from '../types';
import { AlertCircle, CheckCircle, Clock, Camera, ArrowUpRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { equipment, orders } = useApp();

  // KPIs
  const totalEquipment = equipment.length;
  const checkedOut = equipment.filter(e => e.status === EquipmentStatus.CHECKED_OUT).length;
  const inMaintenance = equipment.filter(e => e.status === EquipmentStatus.MAINTENANCE).length;
  const activeOrdersCount = orders.filter(o => o.status === OrderStatus.ACTIVE).length;

  // Get active orders sorted by date descending (newest first)
  const activeOrders = orders
    .filter(o => o.status === OrderStatus.ACTIVE)
    .sort((a, b) => new Date(b.dateOut).getTime() - new Date(a.dateOut).getTime());

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 hidden md:block">لوحة التحكم العامة</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border-r-4 border-tanasoh-primary flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">إجمالي المعدات</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{totalEquipment}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-full text-tanasoh-primary">
            <Camera size={24} />
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border-r-4 border-tanasoh-secondary flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">معدات بالخارج</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{checkedOut}</p>
          </div>
          <div className="p-3 bg-teal-50 rounded-full text-tanasoh-secondary">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border-r-4 border-tanasoh-teal flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">طلبات نشطة</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{activeOrdersCount}</p>
          </div>
          <div className="p-3 bg-teal-50 rounded-full text-tanasoh-teal">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border-r-4 border-red-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">في الصيانة</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{inMaintenance}</p>
          </div>
          <div className="p-3 bg-red-50 rounded-full text-red-500">
            <AlertCircle size={24} />
          </div>
        </div>
      </div>

      {/* Recently Checked Out (Active Orders) - Full Width Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-gray-50/50">
            <div className="flex items-center gap-2">
                <ArrowUpRight className="text-tanasoh-primary" size={20} />
                <h3 className="text-lg font-bold text-gray-800">أحدث المعدات الخارجة</h3>
            </div>
            <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded border border-gray-200 shadow-sm">
                يتم عرض الأذونات التي لم يتم إرجاعها بعد
            </span>
        </div>
        
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-gray-500">
                  <th className="px-6 py-4 text-right font-medium whitespace-nowrap">رقم الإذن</th>
                  <th className="px-6 py-4 text-right font-medium whitespace-nowrap">المستلم</th>
                  <th className="px-6 py-4 text-right font-medium whitespace-nowrap">نوع المهمة</th>
                  <th className="px-6 py-4 text-right font-medium min-w-[200px]">المعدات</th>
                  <th className="px-6 py-4 text-right font-medium whitespace-nowrap">تاريخ الخروج</th>
                  <th className="px-6 py-4 text-right font-medium whitespace-nowrap">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeOrders.map(order => (
                  <tr key={order.id} className="hover:bg-yellow-50/30 transition-colors group">
                     <td className="px-6 py-4 font-bold text-tanasoh-primary">#{order.orderNumber}</td>
                     <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                        <div className="flex flex-col">
                            <span>{order.personName}</span>
                        </div>
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200">
                            {order.type}
                        </span>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                            {order.items.slice(0, 3).map((item, idx) => (
                                <span key={idx} className="bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs shadow-sm whitespace-nowrap">
                                    {item.equipmentName}
                                </span>
                            ))}
                            {order.items.length > 3 && (
                                <span className="text-xs text-gray-400 self-center">+{order.items.length - 3} المزيد</span>
                            )}
                        </div>
                     </td>
                     <td className="px-6 py-4 text-gray-500 font-mono text-xs whitespace-nowrap" dir="ltr">
                        {new Date(order.dateOut).toLocaleDateString('ar-LY')}
                        <span className="block text-[10px] opacity-70">{new Date(order.dateOut).toLocaleTimeString('ar-LY', {hour: '2-digit', minute:'2-digit'})}</span>
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-100 px-2.5 py-1 rounded-full text-xs font-medium">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                            خارج الأرشيف
                        </span>
                     </td>
                  </tr>
                ))}
                
                {activeOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <CheckCircle size={48} className="mb-2 opacity-20" />
                            <p>جميع المعدات موجودة في الأرشيف (لا توجد أذونات خروج نشطة)</p>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
