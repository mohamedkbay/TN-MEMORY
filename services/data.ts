
import { Equipment, EquipmentCategory, EquipmentStatus, OwnershipType, Person, Order, OrderStatus, OrderType } from '../types';

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-001',
    name: 'Sony FX6 Camera A',
    category: EquipmentCategory.CAMERA,
    model: 'Sony FX6',
    serialNumber: 'S-123456',
    ownership: OwnershipType.CHANNEL,
    status: EquipmentStatus.AVAILABLE,
    location: 'Ref-A1',
    notes: 'Main studio camera'
  },
  {
    id: 'eq-002',
    name: 'Sony FX3 Camera',
    category: EquipmentCategory.CAMERA,
    model: 'Sony FX3',
    serialNumber: 'S-789012',
    ownership: OwnershipType.CHANNEL,
    status: EquipmentStatus.CHECKED_OUT,
    location: 'Ref-A2'
  },
  {
    id: 'eq-003',
    name: 'Tripod Sachtler',
    category: EquipmentCategory.TRIPOD,
    model: 'Flowtech 75',
    serialNumber: 'TR-555',
    ownership: OwnershipType.CHANNEL,
    status: EquipmentStatus.AVAILABLE,
    location: 'Ref-B1'
  },
  {
    id: 'eq-004',
    name: 'LiveU Unit 1',
    category: EquipmentCategory.BROADCAST_BAG,
    model: 'LU300',
    serialNumber: 'LU-9988',
    ownership: OwnershipType.CHANNEL,
    status: EquipmentStatus.AVAILABLE,
    location: 'Ref-C1'
  },
  {
    id: 'eq-005',
    name: 'Sennheiser Mic Kit',
    category: EquipmentCategory.AUDIO,
    model: 'G4',
    serialNumber: 'SN-1122',
    ownership: OwnershipType.PERSONAL,
    ownerName: 'محمد الكاسح',
    status: EquipmentStatus.AVAILABLE,
    location: 'Ref-D1'
  },
  {
    id: 'eq-006',
    name: 'SanDisk Extreme Pro',
    category: EquipmentCategory.MEMORY_CARD,
    model: '128GB',
    serialNumber: 'SD-001',
    ownership: OwnershipType.CHANNEL,
    status: EquipmentStatus.AVAILABLE,
    location: 'Box-1',
    mediaType: 'SD',
    capacity: '128GB'
  }
];

export const INITIAL_PEOPLE: Person[] = [
  // Photographers
  { id: 'p-01', fullName: 'محمد الكاسح', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-02', fullName: 'محمد الجفايري', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-03', fullName: 'عادل الزرقاني', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-04', fullName: 'صفوان زاوية', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-05', fullName: 'أحمد ابوظهير', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-06', fullName: 'وليد عياش', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-07', fullName: 'سهيل الغرياني', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-08', fullName: 'محمد حبيب', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-09', fullName: 'نصرالدين الزوبيك', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-10', fullName: 'حكيم التركي', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-11', fullName: 'عدنان', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  { id: 'p-12', fullName: 'محمد العبيدي', jobTitle: 'مصور', department: 'قسم التصوير', phone: '', isActive: true },
  
  // Engineers (Broadcast & Engineering Dept)
  { id: 'e-01', fullName: 'معز بن سالم', jobTitle: 'مهندس بث', department: 'الإدارة الهندسية', phone: '', isActive: true },
  { id: 'e-02', fullName: 'فؤاد بن سعيد', jobTitle: 'مهندس بث', department: 'الإدارة الهندسية', phone: '', isActive: true },
  { id: 'e-03', fullName: 'محمد الجوادي', jobTitle: 'مهندس بث', department: 'الإدارة الهندسية', phone: '', isActive: true },
  { id: 'e-04', fullName: 'مؤيد الورشفاني', jobTitle: 'مهندس بث', department: 'الإدارة الهندسية', phone: '', isActive: true },
  { id: 'e-05', fullName: 'مالك النفاتي', jobTitle: 'مهندس بث', department: 'الإدارة الهندسية', phone: '', isActive: true },
  { id: 'e-06', fullName: 'عبدالرؤوف قاجوم', jobTitle: 'مهندس بث', department: 'الإدارة الهندسية', phone: '', isActive: true },

  // Management
  { id: 'm-01', fullName: 'مجدي الشريف', jobTitle: 'مدير إدارة الإنتاج', department: 'الإدارة', phone: '', isActive: true },

  // Lighting Engineers
  { id: 'l-01', fullName: 'نصر الدين التركي', jobTitle: 'مهندس إضاءة', department: 'الإضاءة', phone: '', isActive: true },
  { id: 'l-02', fullName: 'محمد مسعود', jobTitle: 'مهندس إضاءة', department: 'الإضاءة', phone: '', isActive: true },
  { id: 'l-03', fullName: 'يوسف الشارف', jobTitle: 'مهندس إضاءة', department: 'الإضاءة', phone: '', isActive: true },

  // Reporters (Murasilin)
  { id: 'rep-01', fullName: 'عادل عاشور', jobTitle: 'مراسل', department: 'قسم الأخبار', phone: '', isActive: true },
  { id: 'rep-02', fullName: 'أحمد الورشفاني', jobTitle: 'مراسل', department: 'قسم الأخبار', phone: '', isActive: true, notes: 'قناة التناصح التعليمية' },
  { id: 'rep-03', fullName: 'فرج المجبري', jobTitle: 'مراسل', department: 'قسم الأخبار', phone: '', isActive: true },
  { id: 'rep-04', fullName: 'معتصم ابوعمارة', jobTitle: 'مراسل', department: 'قسم الأخبار', phone: '', isActive: true },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 1001,
    personId: 'p-01',
    personName: 'محمد الكاسح',
    type: OrderType.SHOOTING,
    dateOut: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    status: OrderStatus.ACTIVE,
    createdBy: 'Admin',
    items: [
      {
        equipmentId: 'eq-002',
        equipmentName: 'Sony FX3 Camera',
        conditionOut: 'Excellent'
      }
    ]
  }
];

// Helper to generate IDs
export const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
