
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EquipmentCategory, EquipmentStatus, OwnershipType, Equipment } from '../types';
import { generateId } from '../services/data';
import { StatusBadge } from './ui/StatusBadge';
import { Button } from './ui/Button';
import { Search, Plus, Filter, Edit, MoreVertical } from 'lucide-react';

export const Inventory: React.FC = () => {
  const { equipment, addEquipment } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Equipment Form State
  const [newEq, setNewEq] = useState<Partial<Equipment>>({
    name: '',
    category: EquipmentCategory.CAMERA,
    model: '',
    serialNumber: '',
    ownership: OwnershipType.CHANNEL,
    status: EquipmentStatus.AVAILABLE,
    location: '',
  });

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEq.name && newEq.category) {
      addEquipment({
        ...newEq,
        id: generateId('eq'),
      } as Equipment);
      setIsModalOpen(false);
      setNewEq({ 
        name: '', category: EquipmentCategory.CAMERA, model: '', serialNumber: '', 
        ownership: OwnershipType.CHANNEL, status: EquipmentStatus.AVAILABLE, location: '' 
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">سجل المعدات</h2>
        <Button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto">
          <Plus size={18} className="ml-2" />
          إضافة معدات
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="بحث بالاسم أو الرقم التسلسلي..."
            className="w-full pr-10 pl-4 py-2 border rounded-md focus:ring-2 focus:ring-tanasoh-gold focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={20} className="text-gray-500 hidden md:block" />
          <select 
            className="w-full md:w-auto border rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-tanasoh-gold outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">كل التصنيفات</option>
            {Object.values(EquipmentCategory).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">الاسم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">التصنيف</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">السيريال</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">المكان</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">الملكية</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipment.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono" dir="ltr">{item.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.ownership} {item.ownerName ? `(${item.ownerName})` : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button className="text-gray-400 hover:text-tanasoh-gold transition-colors">
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEquipment.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              لا توجد معدات تطابق البحث
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">إضافة معدات جديدة</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم الجهاز *</label>
                  <input required type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
                    value={newEq.name} onChange={e => setNewEq({...newEq, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الموديل</label>
                  <input type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
                    value={newEq.model} onChange={e => setNewEq({...newEq, model: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">التصنيف *</label>
                  <select className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
                    value={newEq.category} onChange={e => setNewEq({...newEq, category: e.target.value as EquipmentCategory})}>
                    {Object.values(EquipmentCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الرقم التسلسلي</label>
                  <input type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
                    value={newEq.serialNumber} onChange={e => setNewEq({...newEq, serialNumber: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مكان الحفظ</label>
                  <input type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
                    value={newEq.location} onChange={e => setNewEq({...newEq, location: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الملكية</label>
                  <select className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
                    value={newEq.ownership} onChange={e => setNewEq({...newEq, ownership: e.target.value as OwnershipType})}>
                    {Object.values(OwnershipType).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {newEq.ownership !== OwnershipType.CHANNEL && (
                   <div className="col-span-1 md:col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-1">اسم المالك</label>
                     <input type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold bg-yellow-50"
                       value={newEq.ownerName || ''} onChange={e => setNewEq({...newEq, ownerName: e.target.value})} placeholder="اسم الشركة أو الشخص" />
                   </div>
                )}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
                  <textarea className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold" rows={3}
                    value={newEq.notes || ''} onChange={e => setNewEq({...newEq, notes: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t sticky bottom-0 bg-white">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)} type="button">إلغاء</Button>
                <Button variant="primary" type="submit">حفظ البيانات</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
