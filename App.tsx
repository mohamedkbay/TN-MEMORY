
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Checkout } from './components/Checkout';
import { Returns } from './components/Returns';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { UserRole } from './types';
import { LayoutDashboard, Database, ClipboardList, RotateCcw, LogOut, Settings as SettingsIcon, Menu, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentUser, logout } = useApp();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard': return <Dashboard />;
      case 'inventory': return <Inventory />;
      case 'checkout': return <Checkout />;
      case 'returns': return <Returns />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: <LayoutDashboard size={22} /> },
    { id: 'checkout', label: 'إذن خروج', icon: <ClipboardList size={22} /> },
    { id: 'returns', label: 'إرجاع معدات', icon: <RotateCcw size={22} /> },
    { id: 'inventory', label: 'سجل المعدات', icon: <Database size={22} /> },
  ];

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="flex min-h-screen bg-[#f0fdfa] font-sans text-gray-800" dir="rtl">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 right-0 h-full w-72 bg-[#0a0a0a] text-white flex flex-col z-30 shadow-2xl border-l border-white/5 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        md:translate-x-0
      `}>
        {/* Brand Header */}
        <div className="relative h-20 md:h-40 flex flex-col items-center justify-center p-4 border-b border-white/5 bg-[#050505]">
          
          {/* Close Button Mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="absolute top-4 left-4 text-gray-400 hover:text-white md:hidden"
          >
            <X size={24} />
          </button>

          {/* Subtle Pattern in Header */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{
                 backgroundImage: 'radial-gradient(#009F94 1px, transparent 1px)',
                 backgroundSize: '16px 16px'
               }}>
          </div>
          
          {/* Text Identity */}
          <div className="z-10 flex flex-col items-center pt-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide font-sans">ذاكرة التناصح</h1>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="h-0.5 w-6 md:w-8 bg-gradient-to-r from-transparent via-tanasoh-primary to-transparent"></span>
              <p className="text-[10px] text-tanasoh-grey font-medium tracking-widest uppercase">SYSTEM ARCHIVE</p>
              <span className="h-0.5 w-6 md:w-8 bg-gradient-to-r from-transparent via-tanasoh-primary to-transparent"></span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-xs font-bold text-tanasoh-grey mb-2">القائمة</p>
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`
                  w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 group relative
                  ${isActive 
                    ? 'bg-gradient-to-l from-tanasoh-primary to-[#d97d02] text-white shadow-lg shadow-orange-900/20 translate-x-[-2px]' 
                    : 'text-tanasoh-grey hover:bg-white/5 hover:text-white hover:translate-x-[-2px]'
                  }
                `}
              >
                <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span className={`relative z-10 font-medium text-sm ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
                
                {isActive && <div className="absolute right-0 top-0 h-full w-1 bg-white/20"></div>}
              </button>
            );
          })}

          <div className="pt-6 mt-6 border-t border-white/5">
             <p className="px-4 text-xs font-bold text-tanasoh-grey mb-2">النظام</p>
             
             {/* Settings only for Director */}
             {currentUser?.role === UserRole.DIRECTOR && (
               <button 
                  onClick={() => handleTabChange('settings')}
                  className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 ${currentTab === 'settings' ? 'text-white bg-white/10' : 'text-tanasoh-grey hover:bg-white/5 hover:text-white'}`}
               >
                  <SettingsIcon size={20} />
                  <span className="font-medium text-sm">إعدادات النظام</span>
               </button>
             )}

             <button 
               onClick={logout}
               className="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
              >
                <LogOut size={20} />
                <span className="font-medium text-sm">تسجيل خروج</span>
             </button>
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-4 bg-[#050505] border-t border-white/5">
          <div className="flex items-center gap-3 bg-[#151515] p-3 rounded-lg border border-white/5 hover:border-tanasoh-secondary/30 transition-colors group">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tanasoh-primary to-orange-600 flex items-center justify-center text-white font-bold shadow-lg text-sm">
               {currentUser?.username.charAt(0).toUpperCase()}
             </div>
             <div className="flex-1 overflow-hidden">
               <p className="text-sm font-bold text-white truncate group-hover:text-tanasoh-primary transition-colors">{currentUser?.fullName}</p>
               <p className="text-[10px] text-tanasoh-grey truncate">{currentUser?.role}</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:mr-72 transition-all duration-300">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-600 hover:text-tanasoh-primary p-1"
            >
              <Menu size={24} />
            </button>
            
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                {currentTab === 'settings' ? 'إعدادات النظام' : navItems.find(i => i.id === currentTab)?.label}
              </h2>
              <p className="text-[10px] md:text-xs text-tanasoh-grey mt-0.5 md:mt-1 hidden sm:block">
                {new Date().toLocaleDateString('ar-LY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
               <span className="text-xs md:text-sm font-bold text-tanasoh-secondary hidden sm:inline">قناة التناصح الفضائية</span>
               <span className="text-[10px] md:text-xs text-white bg-tanasoh-primary px-2 py-0.5 rounded-full">نسخة تجريبية 1.1</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto overflow-x-hidden">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
       <AuthWrapper />
    </AppProvider>
  );
};

const AuthWrapper: React.FC = () => {
  const { currentUser } = useApp();
  if (!currentUser) {
    return <Login />;
  }
  return <MainLayout />;
};

export default App;
