import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';

export const Login: React.FC = () => {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Abstract Background Pattern - Teal dots */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(#009F94 1.5px, transparent 1.5px)',
             backgroundSize: '32px 32px'
           }}>
      </div>
      
      {/* Ambient Glow - Orange/Gold bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-tanasoh-primary/5 to-transparent pointer-events-none"></div>
      {/* Ambient Glow - Teal top */}
      <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-tanasoh-secondary/5 to-transparent pointer-events-none"></div>

      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10 relative z-10 animate-fade-in">
        
        {/* System Identity (Text Based) */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-white tracking-wide">ذاكرة التناصح</h1>
          <div className="flex gap-1 mt-3 mb-2">
             <div className="h-1 w-8 bg-tanasoh-secondary rounded-full"></div>
             <div className="h-1 w-2 bg-tanasoh-primary rounded-full"></div>
          </div>
          <p className="text-tanasoh-grey text-sm">منظومة أرشفة وإدارة المعدات</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-tanasoh-grey mb-2">اسم المستخدم</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-tanasoh-primary focus:border-transparent outline-none transition-all placeholder-gray-600"
              placeholder="أدخل اسم المستخدم..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-tanasoh-grey mb-2">كلمة المرور</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-tanasoh-primary focus:border-transparent outline-none transition-all placeholder-gray-600"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button variant="primary" className="w-full py-3 text-lg font-bold shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 transition-all bg-gradient-to-r from-tanasoh-primary to-[#d97d02]" type="submit">
            تسجيل الدخول
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-xs text-tanasoh-grey leading-relaxed">
            الحسابات المصرح بها:<br/>
            مدير النظام: <span className="text-gray-400 font-mono">majdi / 123456</span><br/>
            رئيس الأرشيف: <span className="text-gray-400 font-mono">aziz / 123456</span><br/>
            موظف أرشيف: <span className="text-gray-400 font-mono">aribi / 123456</span>
          </p>
        </div>
      </div>
    </div>
  );
};