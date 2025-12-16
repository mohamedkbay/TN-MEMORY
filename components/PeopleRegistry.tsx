import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Person, Order, OrderStatus } from '../types';
import { generateId } from '../services/data';
import { Button } from './ui/Button';
import { StatusBadge } from './ui/StatusBadge';
import { Search, Plus, UserPlus, Trash2, FileText, X, ChevronRight, User, Calendar, Briefcase } from 'lucide-react';

export const PeopleRegistry: React.FC = () => {
  const { people, orders, addPerson, deletePerson } = useApp();
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportSearchTerm, setReportSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add Person Form State
  const [newPerson, setNewPerson] = useState<Partial<Person>>({
    fullName: '',
    jobTitle: 'مصور',
    department: 'قسم التصوير',
    phone: '',
    isActive: true
  });

  // Filter People List
  const filteredPeople = people.filter(p => 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get Orders for Selected Person
  const personOrders = selectedPerson 
    ? orders.filter(o => o.personId === selectedPerson.id)
            .sort((a, b) => new Date(b.dateOut).getTime() - new Date(a.dateOut).getTime())
    : [];

  // Filter Orders in Report
  const filteredOrders = personOrders.filter(o => 
    o.orderNumber.toString().includes(reportSearchTerm) ||
    o.type.includes(reportSearchTerm)
  );

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPerson.fullName) {
      addPerson({
        ...newPerson,
        id: generateId('p'),
      } as Person);
      setIsModalOpen(false);
      setNewPerson({ fullName: '', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true });
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
       deletePerson(id);
       if (selectedPerson?.id === id) {
           setView('list');
           setSelectedPerson(null);
       }
    }
  };

  const openReport = (person: Person) => {
    setSelectedPerson(person);
    setView('detail');
    setReportSearchTerm('');
  };

  const renderAddModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 animate-scale-in">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <UserPlus size={20} className="text-tanasoh-secondary" />
            إضافة موظف جديد
          </h3>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleAddPerson} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الثلاثي</label>
            <input required type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
              value={newPerson.fullName} onChange={e => setNewPerson({...newPerson, fullName: e.target.value})} 
              placeholder="مثال: محمد أحمد..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المسمى الوظيفي</label>
            <select className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
              value={newPerson.jobTitle} onChange={e => setNewPerson({...newPerson, jobTitle: e.target.value})}>
              <option value="مصور">مصور</option>
              <option value="مهندس بث">مهندس بث</option>
              <option value="مهندس إضاءة">مهندس إضاءة</option>
              <option value="مدير إدارة الإنتاج">مدير إدارة الإنتاج</option>
              <option value="مراسل">مراسل</option>
              <option value="مخرج">مخرج</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
            <input type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
              value={newPerson.department} onChange={e => setNewPerson({...newPerson, department: e.target.value})} />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف (اختياري)</label>
             <input type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-tanasoh-gold"
               value={newPerson.phone} onChange={e => setNewPerson({...newPerson, phone: e.target.value})} />
          </div>
          <div className="pt-4 flex gap-2">
            <Button variant="primary" type="submit" className="flex-1">حفظ</Button>
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">إلغاء</Button>
          </div>
        </form>
      </div>
    </div>
  );

  // --- REPORT DETAIL VIEW ---
  if (view === 'detail' && selectedPerson) {
    const activeCount = personOrders.filter(o => o.status === OrderStatus.ACTIVE).length;
    
    return (
      <div className="animate-fade-in space-y-6">
        {/* Header / Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <button onClick={() => setView('list')} className="hover:text-tanasoh-secondary">سجل الموظفين</button>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-bold">{selectedPerson.fullName}</span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tanasoh-secondary to-tanasoh-primary"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border-2 border-white shadow-md">
                        <User size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedPerson.fullName}</h2>
                        <div className="flex items-center gap-3 text-gray-500 text-sm mt-1">
                            <span className="flex items-center gap-1"><Briefcase size={14} /> {selectedPerson.jobTitle}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{selectedPerson.department}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500">إجمالي الأذونات</div>
                        <div className="text-xl font-bold text-tanasoh-secondary">{personOrders.length}</div>
                    </div>
                    <div className="text-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500">عهد حالية</div>
                        <div className={`text-xl font-bold ${activeCount > 0 ? 'text-orange-500' : 'text-gray-800'}`}>{activeCount}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
            <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <FileText size={18} className="text-tanasoh-primary" />
                    سجل الحركة وتقرير الأذونات
                </h3>
                <div className="relative w-full md:w-64">
                    <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="بحث برقم الإذن..."
                        className="w-full pr-9 pl-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-tanasoh-gold outline-none"
                        value={reportSearchTerm}
                        onChange={(e) => setReportSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right font-medium text-gray-500">رقم الإذن</th>
                            <th className="px-6 py-3 text-right font-medium text-gray-500">نوع المهمة</th>
                            <th className="px-6 py-3 text-right font-medium text-gray-500">تاريخ الخروج</th>
                            <th className="px-6 py-3 text-right font-medium text-gray-500">تاريخ الإرجاع</th>
                            <th className="px-6 py-3 text-right font-medium text-gray-500">المعدات</th>
                            <th className="px-6 py-3 text-right font-medium text-gray-500">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredOrders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-bold text-tanasoh-primary">#{order.orderNumber}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-white border border-gray-200 px-2 py-1 rounded text-xs">{order.type}</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-600 dir-ltr text-right">
                                   {new Date(order.dateOut).toLocaleDateString('ar-LY')}
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-600 dir-ltr text-right">
                                   {order.dateIn ? new Date(order.dateIn).toLocaleDateString('ar-LY') : '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        {order.items.map((item, idx) => (
                                            <span key={idx} className="text-xs text-gray-700 block">• {item.equipmentName}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={order.status} />
                                </td>
                            </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                             <tr>
                                 <td colSpan={6} className="py-10 text-center text-gray-400">
                                     لا توجد سجلات مطابقة للبحث
                                 </td>
                             </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">سجل المصورين والمهندسين</h2>
           <p className="text-gray-500 text-sm mt-1">إدارة بيانات الطاقم واستخراج تقارير العهد</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} className="ml-2" />
          إضافة موظف
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="بحث بالاسم أو المسمى الوظيفي..."
            className="w-full pr-10 pl-4 py-2 border rounded-md focus:ring-2 focus:ring-tanasoh-gold outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPeople.map(person => (
          <div 
            key={person.id}
            onClick={() => openReport(person)}
            className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:border-tanasoh-secondary/50 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Hover Indicator */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gray-100 group-hover:bg-tanasoh-secondary transition-colors"></div>

            <div className="flex justify-between items-start">
               <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-tanasoh-grey group-hover:text-tanasoh-secondary transition-colors">
                       <User size={24} />
                   </div>
                   <div>
                       <h3 className="font-bold text-gray-900 group-hover:text-tanasoh-primary transition-colors">{person.fullName}</h3>
                       <p className="text-xs text-gray-500">{person.jobTitle}</p>
                   </div>
               </div>
               <button 
                  onClick={(e) => handleDelete(person.id, e)}
                  className="text-gray-300 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors z-10"
               >
                   <Trash2 size={16} />
               </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{person.department}</span>
                <span className="flex items-center gap-1 text-xs text-tanasoh-secondary font-medium">
                    عرض التقرير <ChevronRight size={14} />
                </span>
            </div>
          </div>
        ))}
      </div>
      
      {isModalOpen && renderAddModal()}
    </div>
  );
};
