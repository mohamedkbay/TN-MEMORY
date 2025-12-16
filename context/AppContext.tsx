import React, { createContext, useContext, useState, useEffect } from 'react';
import { Equipment, Person, Order, EquipmentStatus, OrderStatus, User, UserRole } from '../types';
import { INITIAL_EQUIPMENT, INITIAL_PEOPLE, INITIAL_ORDERS } from '../services/data';

interface AppContextType {
  equipment: Equipment[];
  people: Person[];
  orders: Order[];
  currentUser: User | null;
  addEquipment: (item: Equipment) => void;
  updateEquipment: (item: Equipment) => void;
  addPerson: (person: Person) => void;
  deletePerson: (id: string) => void;
  addOrder: (order: Order) => void;
  completeOrder: (orderId: string, returnDate: string, notes?: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock Users Database
const MOCK_USERS: User[] = [
  { id: 'u1', username: 'majdi', fullName: 'مجدي الشريف', role: UserRole.DIRECTOR },
  { id: 'u2', username: 'aziz', fullName: 'عبدالعزيز القماطي', role: UserRole.HEAD_ARCHIVE },
  { id: 'u3', username: 'aribi', fullName: 'محمد عريبي', role: UserRole.ARCHIVIST },
  { id: 'u4', username: 'hossam', fullName: 'حسام مسعود', role: UserRole.ARCHIVIST },
  { id: 'u5', username: 'berish', fullName: 'عبدالسلام بريش', role: UserRole.ARCHIVIST },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Data State
  const [equipment, setEquipment] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('tms_equipment');
    return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT;
  });

  const [people, setPeople] = useState<Person[]>(() => {
    const saved = localStorage.getItem('tms_people');
    return saved ? JSON.parse(saved) : INITIAL_PEOPLE;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('tms_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tms_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Persist Data
  useEffect(() => { localStorage.setItem('tms_equipment', JSON.stringify(equipment)); }, [equipment]);
  useEffect(() => { localStorage.setItem('tms_people', JSON.stringify(people)); }, [people]);
  useEffect(() => { localStorage.setItem('tms_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { 
    if (currentUser) {
        localStorage.setItem('tms_user', JSON.stringify(currentUser)); 
    } else {
        localStorage.removeItem('tms_user');
    }
  }, [currentUser]);

  const addEquipment = (item: Equipment) => {
    setEquipment(prev => [...prev, item]);
  };

  const updateEquipment = (item: Equipment) => {
    setEquipment(prev => prev.map(e => e.id === item.id ? item : e));
  };

  const addPerson = (person: Person) => {
    setPeople(prev => [...prev, person]);
  };

  const deletePerson = (id: string) => {
    setPeople(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    const eqIds = order.items.map(i => i.equipmentId);
    setEquipment(prev => prev.map(e => 
      eqIds.includes(e.id) ? { ...e, status: EquipmentStatus.CHECKED_OUT } : e
    ));
  };

  const completeOrder = (orderId: string, returnDate: string, notes?: string) => {
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) return;

    const updatedOrder = { 
      ...orders[orderIndex], 
      status: OrderStatus.COMPLETED,
      dateIn: returnDate,
      notes: notes ? `${orders[orderIndex].notes || ''} | إرجاع: ${notes}` : orders[orderIndex].notes
    };

    const newOrders = [...orders];
    newOrders[orderIndex] = updatedOrder;
    setOrders(newOrders);

    const eqIds = updatedOrder.items.map(i => i.equipmentId);
    setEquipment(prev => prev.map(e => 
      eqIds.includes(e.id) ? { ...e, status: EquipmentStatus.AVAILABLE } : e
    ));
  };

  // Auth Functions
  const login = (username: string, password: string): boolean => {
    // Simple mock authentication
    // In production, this would hit an API
    if (password === '123456') { // Hardcoded password for demo
        const user = MOCK_USERS.find(u => u.username === username);
        if (user) {
            setCurrentUser(user);
            return true;
        }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider value={{
      equipment,
      people,
      orders,
      currentUser,
      addEquipment,
      updateEquipment,
      addPerson,
      deletePerson,
      addOrder,
      completeOrder,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};