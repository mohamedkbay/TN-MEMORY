
export enum EquipmentStatus {
  AVAILABLE = 'متوفر',
  CHECKED_OUT = 'خارج الأرشيف',
  MAINTENANCE = 'تحت الصيانة',
  DAMAGED = 'تالف',
  LOST = 'مفقود'
}

export enum EquipmentCategory {
  CAMERA = 'كاميرات تصوير',
  STATIC_CAMERA = 'كاميرات ثابتة',
  BROADCAST_BAG = 'شنط بث',
  TRIPOD = 'ترايبودات',
  OUTDOOR_BROADCAST = 'معدات بث خارجي',
  PRODUCTION = 'معدات إنتاج',
  AUDIO = 'معدات صوت',
  LIGHTING = 'معدات إضاءة',
  MEMORY_CARD = 'دواكر',
  STORAGE_DRIVE = 'هاردات تسجيل',
  OTHER = 'معدات أخرى'
}

export enum OwnershipType {
  CHANNEL = 'قناة التناصح',
  TAFAWQ = 'شركة التفوق',
  ZAWIYA = 'مكتب الزاوية',
  MISRATA = 'مكتب مصراتة',
  ISTANBUL = 'مكتب اسطنبول',
  PERSONAL = 'شخصي'
}

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  model: string;
  serialNumber: string;
  ownership: OwnershipType;
  ownerName?: string; // If external
  status: EquipmentStatus;
  location: string;
  notes?: string;
  // Specific for media
  capacity?: string;
  mediaType?: 'SD' | 'SSD' | 'HDD';
}

export interface Person {
  id: string;
  fullName: string;
  jobTitle: string;
  department: string;
  phone: string;
  isActive: boolean;
  notes?: string;
}

export enum OrderType {
  SHOOTING = 'تصوير',
  LIVE_STREAM = 'بث مباشر',
  EPISODE_RECORDING = 'تسجيل حلقة'
}

export enum OrderStatus {
  ACTIVE = 'جاري',
  COMPLETED = 'مكتمل'
}

export interface OrderItem {
  equipmentId: string;
  equipmentName: string;
  conditionOut: string;
  conditionIn?: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  personId: string;
  personName: string;
  type: OrderType;
  dateOut: string; // ISO String
  dateIn?: string; // ISO String
  items: OrderItem[];
  notes?: string;
  status: OrderStatus;
  createdBy: string;
}

// --- Auth Types ---
export enum UserRole {
  DIRECTOR = 'مدير إدارة الإنتاج', // Full Access + Settings
  HEAD_ARCHIVE = 'رئيس قسم الأرشيف', // Full Access
  ARCHIVIST = 'موظف أرشيف' // Standard Access
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
}
