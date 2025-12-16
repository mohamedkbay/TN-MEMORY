
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import { Button } from './ui/Button';
import { Search, RotateCcw, CheckSquare } from 'lucide-react';

export const Returns: React.FC = () => {
  const { orders, completeOrder } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [returnNotes, setReturnNotes] = useState('');

  const activeOrders = orders.filter(o => 
    o.status === OrderStatus.ACTIVE && 
    (o.personName.includes(searchTerm) || o.orderNumber.toString().includes(searchTerm))
  );

  const handleReturn = () => {
    if (selectedOrder) {
      completeOrder(selectedOrder, new Date().toISOString(), returnNotes);
      setSelectedOrder(null);
      setReturnNotes('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">إرجاع المعدات</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Orders List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <div className="p-4 border-b bg-gray-50">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="بحث برقم الإذن أو اسم الموظف..."
                className="w-full pr-10 pl-4 py-2 border rounded-md focus:ring-2 focus:ring-tanasoh-gold outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="divide-y divide-gray-100 max-h-[400px] lg:max-h-[600px] overflow-y-auto">
            {activeOrders.map(order => (
              <div 
                key={order.id}
                onClick={() => setSelectedOrder(order.id)}
                className={`p-4 cursor-pointer hover:bg-yellow-50 transition-colors ${selectedOrder === order.id ? 'bg-yellow-50 border-r-4 border-tanasoh-gold' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-gray-800">#{order.orderNumber}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{order.type}</span>
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">{order.personName}</div>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>{new Date(order.dateOut).toLocaleDateString('ar-LY')}</span>
                  <span>{order.items.length} قطع</span>
                </div>
              </div>
            ))}
            {activeOrders.length === 0 && (
              <div className="p-8 text-center text-gray-400">لا توجد أذونات خروج نشطة حالياً</div>
            )}
          </div>
        </div>

        {/* Return Details Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-center items-center text-center border border-gray-100">
          {selectedOrder ? (
            <div className="w-full text-right animate-fade-in">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">تفاصيل الإرجاع</h3>
                <p className="text-sm text-gray-500">
                  إذن رقم #{orders.find(o => o.id === selectedOrder)?.orderNumber}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-700 mb-2">المعدات المراد إرجاعها:</h4>
                <ul className="bg-gray-50 rounded p-3 text-sm space-y-2 border max-h-40 overflow-y-auto">
                  {orders.find(o => o.id === selectedOrder)?.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{item.equipmentName}</span>
                      <CheckSquare size={16} className="text-green-600" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات الاستلام (حالة المعدات)</label>
                <textarea
                  className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-tanasoh-gold outline-none"
                  rows={4}
                  placeholder="هل يوجد أي عطل أو ملاحظة؟"
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" className="flex-1" onClick={handleReturn}>
                  <RotateCcw size={18} className="ml-2" />
                  تأكيد الإرجاع
                </Button>
                <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
                  إلغاء
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 py-10">
              <RotateCcw size={48} className="mx-auto mb-4 opacity-50" />
              <p>يرجى اختيار إذن خروج من القائمة لتسجيل الإرجاع</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
