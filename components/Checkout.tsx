
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EquipmentStatus, OrderType, OrderStatus, Equipment } from '../types';
import { generateId } from '../services/data';
import { Button } from './ui/Button';
import { Search, ShoppingCart, User, X } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { equipment, people, addOrder } = useApp();
  
  // Form State
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const [orderType, setOrderType] = useState<OrderType>(OrderType.SHOOTING);
  const [selectedItems, setSelectedItems] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filtering Available Equipment
  const availableEquipment = equipment.filter(e => 
    e.status === EquipmentStatus.AVAILABLE &&
    (e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     e.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddItem = (item: Equipment) => {
    if (!selectedItems.find(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(selectedItems.filter(i => i.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPersonId || selectedItems.length === 0) return;

    const person = people.find(p => p.id === selectedPersonId);
    
    const newOrder = {
      id: generateId('ord'),
      orderNumber: Math.floor(100000 + Math.random() * 900000),
      personId: selectedPersonId,
      personName: person?.fullName || 'Unknown',
      type: orderType,
      dateOut: new Date().toISOString(),
      status: OrderStatus.ACTIVE,
      createdBy: 'Admin', // In real app, logged in user
      notes,
      items: selectedItems.map(item => ({
        equipmentId: item.id,
        equipmentName: item.name,
        conditionOut: 'سليم' // Default condition
      }))
    };

    addOrder(newOrder);
    setSuccessMsg(`تم إنشاء إذن خروج رقم #${newOrder.orderNumber} بنجاح`);
    
    // Reset
    setSelectedItems([]);
    setSelectedPersonId('');
    setNotes('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 lg:h-[calc(100vh-120px)]">
      
      {/* Left Column (Bottom on mobile): Equipment Selection */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm flex flex-col overflow-hidden min-h-[500px]">
        <div className="p-4 border-b">
          <h3 className="font-bold text-gray-800 mb-2">اختر المعدات المتاحة</h3>
          <div className="relative">
            <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="بحث عن معدات..."
              className="w-full pr-10 pl-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-tanasoh-gold outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableEquipment.map(item => (
              <div 
                key={item.id}
                onClick={() => handleAddItem(item)}
                className={`p-3 border rounded cursor-pointer transition-all hover:border-tanasoh-gold flex justify-between items-center group
                  ${selectedItems.find(i => i.id === item.id) ? 'bg-yellow-50 border-tanasoh-gold ring-1 ring-tanasoh-gold' : 'bg-white'}
                `}
              >
                <div>
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.model}</div>
                </div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded group-hover:bg-yellow-200 transition-colors">
                  {item.category}
                </div>
              </div>
            ))}
            {availableEquipment.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-10 text-gray-400">لا توجد معدات متاحة بهذا الاسم</div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column (Top on mobile): Order Summary & Submit */}
      <div className="bg-white rounded-lg shadow-sm flex flex-col h-auto lg:h-full border-t-4 border-tanasoh-gold sticky top-0 lg:static z-0">
        <div className="p-5 border-b bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart size={24} className="text-tanasoh-gold" />
            إذن خروج جديد
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          {successMsg && (
            <div className="bg-green-100 text-green-800 p-3 rounded text-sm text-center font-bold animate-pulse">
              {successMsg}
            </div>
          )}

          {/* Person Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المستلم (الموظف)</label>
            <div className="relative">
              <User className="absolute right-3 top-2.5 text-gray-400" size={18} />
              <select 
                required
                className="w-full pr-10 pl-3 py-2 border rounded-md focus:ring-2 focus:ring-tanasoh-gold outline-none appearance-none bg-white"
                value={selectedPersonId}
                onChange={(e) => setSelectedPersonId(e.target.value)}
              >
                <option value="">اختر الموظف...</option>
                {people.filter(p => p.isActive).map(person => (
                  <option key={person.id} value={person.id}>{person.fullName} - {person.jobTitle}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mission Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع المهمة</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(OrderType).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`flex-1 min-w-[80px] py-2 text-xs font-medium rounded border transition-colors
                    ${orderType === type ? 'bg-tanasoh-gold text-white border-tanasoh-gold' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Items List */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">المعدات المختارة</label>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{selectedItems.length}</span>
            </div>
            {selectedItems.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-sm text-gray-400">
                لم يتم اختيار معدات بعد
              </div>
            ) : (
              <ul className="space-y-2 max-h-48 lg:max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {selectedItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-100 text-sm">
                    <span className="truncate max-w-[180px]">{item.name}</span>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-400 hover:text-red-600">
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Notes */}
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات إضافية</label>
             <textarea 
               className="w-full border rounded p-2 text-sm focus:ring-2 focus:ring-tanasoh-gold outline-none"
               rows={2}
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
             ></textarea>
          </div>

        </div>

        <div className="p-5 border-t bg-gray-50">
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleSubmit}
            disabled={!selectedPersonId || selectedItems.length === 0}
          >
            تأكيد العملية
          </Button>
        </div>
      </div>
    </div>
  );
};
