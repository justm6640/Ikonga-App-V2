import React, { useState } from 'react';
import { AppView, UserProfile } from '../types';
import { LayoutDashboard, Utensils, Activity, Heart, LineChart, LogOut, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  user: UserProfile;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: AppView.NUTRITION, label: 'Ikonutrition', icon: Utensils },
    { id: AppView.FITNESS, label: 'Ikofitness', icon: Activity },
    { id: AppView.WELLNESS, label: 'Ikowellness & Beauty', icon: Heart },
    { id: AppView.PROGRESS, label: 'Mon Suivi', icon: LineChart },
  ];

  const handleNavClick = (view: AppView) => {
    onChangeView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 shadow-sm flex justify-between items-center z-20 sticky top-0">
        <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-ikonga-orange font-script">Ikonga</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="mb-8 text-center hidden md:block">
            <h1 className="text-3xl text-ikonga-orange font-script mb-1">Ikonga</h1>
            <p className="text-xs text-gray-400 tracking-widest uppercase">Coaching Minceur</p>
          </div>

          <div className="mb-8 flex flex-col items-center md:hidden">
             <img src={user.avatarUrl} alt="User" className="w-16 h-16 rounded-full mb-2 border-2 border-ikonga-rose" />
             <p className="font-semibold text-gray-700">{user.firstName}</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-ikonga-orange/10 to-ikonga-rose/10 text-ikonga-orange font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-ikonga-secondary'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-100">
             <div className="flex items-center space-x-3 mb-4 px-2 hidden md:flex">
                <img src={user.avatarUrl} alt="User" className="w-10 h-10 rounded-full border border-gray-200" />
                <div className="text-sm">
                    <p className="font-medium text-gray-800">{user.firstName}</p>
                    <p className="text-gray-500 text-xs">{user.subscriptionType}</p>
                </div>
             </div>
            <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
            {children}
        </div>
      </main>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/20 z-20 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};